from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from accounts.models import User, UserRole
from projects.models import Project
from contributions.models import Contribution, ContributionStatus
from reviews.models import ReviewTask, ReviewTaskStatus, ReviewDecision
from learning.models import LearningQuest, LearningLesson, LearningProgress, DifficultyLevel
from community.models import Proposal, ProposalOption, ProposalParticipation, DecisionRecord
from moderation.models import AuditEvent
from gamification.models import XPEvent, XPCategory

class WorkflowAndSecurityTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Seed Users
        self.learner = User.objects.create_user(
            username='test_learner',
            email='learner@test.com',
            password='password123',
            display_name='Test Learner',
            role=UserRole.LEARNER,
            learning_xp=0
        )
        self.contributor = User.objects.create_user(
            username='test_contributor',
            email='contributor@test.com',
            password='password123',
            display_name='Test Contributor',
            role=UserRole.CONTRIBUTOR
        )
        self.reviewer = User.objects.create_user(
            username='test_reviewer',
            email='reviewer@test.com',
            password='password123',
            display_name='Test Reviewer',
            role=UserRole.REVIEWER
        )
        self.admin = User.objects.create_user(
            username='test_admin',
            email='admin@test.com',
            password='password123',
            display_name='Test Admin',
            role=UserRole.ADMIN,
            is_staff=True
        )

        # Seed Project
        self.project = Project.objects.create(
            name='Test Project',
            description='Test Project Description',
            language_label='Test Language'
        )

        # Seed Quest
        self.quest = LearningQuest.objects.create(
            title='Test Quest',
            description='Test Quest Description',
            xp_reward=100,
            difficulty=DifficultyLevel.BEGINNER
        )

    # 1. AUTH & ROLE ACCESS
    def test_unauthenticated_cannot_create_contribution(self):
        response = self.client.post('/api/contributions/', {
            'project': self.project.id,
            'content': 'Unauthorized word',
            'contribution_type': 'example_word'
        })
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_authenticated_contributor_can_submit_and_withdraw(self):
        self.client.force_authenticate(user=self.contributor)
        # Create
        create_res = self.client.post('/api/contributions/', {
            'project': self.project.id,
            'content': 'tāla',
            'contribution_type': 'example_word',
            'language_variety': 'Standard',
            'writing_system': 'Latin'
        })
        self.assertEqual(create_res.status_code, status.HTTP_201_CREATED)
        contrib_id = create_res.data['id']

        # Withdraw
        withdraw_res = self.client.post(f'/api/contributions/{contrib_id}/withdraw/')
        self.assertEqual(withdraw_res.status_code, status.HTTP_200_OK)
        self.assertEqual(withdraw_res.data['status'], 'withdrawn')

        # Verify Audit Log was generated
        audit_exists = AuditEvent.objects.filter(action="contribution.withdrawn", target_id=contrib_id).exists()
        self.assertTrue(audit_exists)

    def test_learner_cannot_withdraw_another_user_contribution(self):
        self.client.force_authenticate(user=self.contributor)
        create_res = self.client.post('/api/contributions/', {
            'project': self.project.id,
            'content': 'mālik',
            'contribution_type': 'example_word'
        })
        contrib_id = create_res.data['id']

        # Attempt withdrawal by different user (learner)
        self.client.force_authenticate(user=self.learner)
        withdraw_res = self.client.post(f'/api/contributions/{contrib_id}/withdraw/')
        self.assertEqual(withdraw_res.status_code, status.HTTP_403_FORBIDDEN)

    # 2. REVIEW STUDIO SECURITY & MANDATORY RATIONALE
    def test_learner_cannot_submit_review(self):
        contrib = Contribution.objects.create(
            project=self.project,
            contributor=self.contributor,
            content='word',
            contribution_type='example_word'
        )
        task = ReviewTask.objects.create(
            contribution=contrib,
            task_scope='Standard Review',
            status=ReviewTaskStatus.ASSIGNED
        )
        self.client.force_authenticate(user=self.learner)
        res = self.client.post(f'/api/reviews/{task.id}/submit/', {
            'action': 'approve',
            'rationale': 'I like this word'
        })
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_reviewer_can_submit_review_with_mandatory_rationale(self):
        contrib = Contribution.objects.create(
            project=self.project,
            contributor=self.contributor,
            content='kūna',
            contribution_type='example_word'
        )
        task = ReviewTask.objects.create(
            contribution=contrib,
            task_scope='Vowel Length Verification',
            status=ReviewTaskStatus.ASSIGNED
        )
        self.client.force_authenticate(user=self.reviewer)

        # Empty rationale should fail
        fail_res = self.client.post(f'/api/reviews/{task.id}/submit/', {
            'action': 'approve',
            'rationale': '   '
        })
        self.assertEqual(fail_res.status_code, status.HTTP_400_BAD_REQUEST)

        # Valid review with rationale should succeed
        success_res = self.client.post(f'/api/reviews/{task.id}/submit/', {
            'action': 'approve',
            'rationale': 'Complies with documented macron vowel length convention.'
        })
        self.assertEqual(success_res.status_code, status.HTTP_201_CREATED)
        self.reviewer.refresh_from_db()
        self.assertGreater(self.reviewer.review_xp, 0)

    # 3. XP IDEMPOTENCY & DUPLICATE PREVENTION
    def test_quest_xp_is_awarded_only_once(self):
        self.client.force_authenticate(user=self.learner)

        # First completion: Should earn XP
        first_res = self.client.post('/api/learning/progress/', {'quest_id': self.quest.id})
        self.assertEqual(first_res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(first_res.data['xp_awarded'], 100)
        self.learner.refresh_from_db()
        self.assertEqual(self.learner.learning_xp, 100)

        # Repeated completion (Review mode): Should NOT duplicate XP
        second_res = self.client.post('/api/learning/progress/', {'quest_id': self.quest.id})
        self.assertEqual(second_res.status_code, status.HTTP_200_OK)
        self.assertEqual(second_res.data['xp_awarded'], 0)
        self.learner.refresh_from_db()
        self.assertEqual(self.learner.learning_xp, 100)

        # Verify only one XPEvent created in audit ledger
        xp_events_count = XPEvent.objects.filter(user=self.learner, idempotency_key=f"quest_{self.learner.id}_{self.quest.id}").count()
        self.assertEqual(xp_events_count, 1)

    # 4. SABHA COMMUNITY PARTICIPATION
    def test_proposal_participation_feedback(self):
        proposal = Proposal.objects.create(
            project=self.project,
            title='Vowel Digraph Proposal',
            scope='Digraph vs Macron',
            background='Historical background',
            problem='Spelling ambiguity'
        )
        res = self.client.post(f'/api/proposals/{proposal.id}/participate/', {
            'author_name': 'Community Speaker',
            'feedback_text': 'Doubled vowels work much better for our local phone keyboards.'
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(proposal.participations.count(), 1)
        self.assertEqual(proposal.participations.first().feedback_text, 'Doubled vowels work much better for our local phone keyboards.')

    # 5. AUDIT IMMUTABILITY
    def test_audit_event_immutability(self):
        event = AuditEvent.objects.create(
            actor_name='System',
            action='system.startup',
            target_type='Platform',
            target_id=1
        )
        # Attempt update
        event.action = 'system.tampered'
        with self.assertRaises(PermissionError):
            event.save()

        # Attempt delete
        with self.assertRaises(PermissionError):
            event.delete()
