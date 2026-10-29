from django.core.management.base import BaseCommand
from accounts.models import User, UserRole
from projects.models import Project, WritingSystem, OrthographyVersion, OrthographicRule
from learning.models import LearningQuest, LearningLesson, DifficultyLevel
from community.models import Proposal, ProposalOption, DecisionRecord
from contributions.models import Contribution, ContributionType, ContributionStatus
from reviews.models import ReviewTask, ReviewTaskStatus
from moderation.models import AuditEvent

class Command(BaseCommand):
    help = 'Seeds initial synthetic demonstration data for Lipi Sabha'

    def handle(self, *args, **options):
        self.stdout.write("Seeding Lipi Sabha demonstration data...")

        # 1. Users
        learner, _ = User.objects.get_or_create(
            username='learner',
            defaults={
                'email': 'learner@demo.lipisabha.org',
                'display_name': 'Aria (Demo Learner)',
                'role': UserRole.LEARNER,
                'learning_xp': 450
            }
        )
        if _:
            learner.set_password('demo1234')
            learner.save()

        reviewer, _ = User.objects.get_or_create(
            username='reviewer',
            defaults={
                'email': 'reviewer@demo.lipisabha.org',
                'display_name': 'Meera (Demo Reviewer)',
                'role': UserRole.REVIEWER,
                'learning_xp': 1200,
                'review_xp': 650
            }
        )
        if _:
            reviewer.set_password('demo1234')
            reviewer.save()

        admin, _ = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@demo.lipisabha.org',
                'display_name': 'Admin (Demo)',
                'role': UserRole.ADMIN,
                'is_staff': True,
                'is_superuser': True
            }
        )
        if _:
            admin.set_password('admin1234')
            admin.save()

        # 2. Projects
        p1, _ = Project.objects.get_or_create(
            id=1,
            defaults={
                'name': 'Tundra Script Project',
                'description': 'A synthetic demonstration project exploring different ways to write a fictional language variety called "Tundrani".',
                'language_label': 'Tundrani (Fictional Demo Language)',
                'community_context': 'Fictional demonstration. No real community is represented.',
                'status': 'demo',
                'visibility': 'public',
                'governance_model': 'Open consultation with community vote'
            }
        )

        ws1, _ = WritingSystem.objects.get_or_create(
            id=1,
            defaults={
                'project': p1,
                'name': 'Latin-based with Macrons',
                'description': 'A Latin alphabet adaptation with macrons for long vowels',
                'script_code': 'Latn'
            }
        )

        ws2, _ = WritingSystem.objects.get_or_create(
            id=2,
            defaults={
                'project': p1,
                'name': 'Modified Cyrillic',
                'description': 'A Cyrillic-based writing system with additional characters',
                'script_code': 'Cyrl'
            }
        )

        ov1, _ = OrthographyVersion.objects.get_or_create(
            id=1,
            defaults={
                'project': p1,
                'writing_system': ws1,
                'version_label': 'Latin v1.0',
                'status': 'active',
                'documentation': 'Initial proposal with basic Latin alphabet and four diacritics.'
            }
        )

        OrthographicRule.objects.get_or_create(
            id=1,
            defaults={
                'orthography_version': ov1,
                'title': 'Vowel Length Marking',
                'explanation': 'Long vowels are marked with a macron (ā, ē, ī, ō, ū). Short vowels are unmarked.',
                'examples': [{'input': 'tala', 'output': 'tāla', 'explanation': 'First vowel short, second long'}],
                'sources': ['Synthetic demonstration standard'],
                'status': 'approved'
            }
        )

        # 3. Learning Quests
        q1, _ = LearningQuest.objects.get_or_create(
            id=1,
            defaults={
                'title': 'First Writing System',
                'description': 'Understand what a writing system is and why communities might have different ways to write the same language.',
                'difficulty': DifficultyLevel.BEGINNER,
                'xp_reward': 100,
                'icon': '✦'
            }
        )

        LearningLesson.objects.get_or_create(
            quest=q1,
            order=1,
            defaults={
                'title': 'What is a Writing System?',
                'content': {
                    'type': 'text',
                    'title': 'What is a Writing System?',
                    'body': 'A writing system visually represents language. Different writing systems carry different histories and trade-offs.'
                }
            }
        )

        LearningLesson.objects.get_or_create(
            quest=q1,
            order=2,
            defaults={
                'title': 'Who Decides?',
                'content': {
                    'type': 'multiple_choice',
                    'question': 'Who should decide which writing system a community uses?',
                    'options': ['The community itself', 'External linguists only', 'Platform algorithms', 'Whoever has the most data'],
                    'correct_index': 0,
                    'explanation': 'The community is the decision-maker, not just the dataset.'
                }
            }
        )

        # 4. Proposals
        prop1, _ = Proposal.objects.get_or_create(
            id=1,
            defaults={
                'project': p1,
                'title': 'Vowel Length Representation Method',
                'scope': 'Deciding between macrons and double vowels for marking long vowels in Latin-based orthography',
                'background': 'The current Latin-based orthography uses macrons. Double vowels (aa, ee) have been proposed.',
                'problem': 'Community members have expressed different preferences for typing convenience vs phonetic elegance.',
                'author_display_name': 'Rohan (Demo Facilitator)',
                'status': 'open'
            }
        )

        ProposalOption.objects.get_or_create(
            proposal=prop1,
            title='Macron System (ā, ē, ī)',
            defaults={
                'description': 'Continue using macrons for long vowels',
                'advantages': 'Visually compact, linguistically precise',
                'disadvantages': 'Requires specialized keyboard or IME'
            }
        )

        ProposalOption.objects.get_or_create(
            proposal=prop1,
            title='Double Vowel System (aa, ee, ii)',
            defaults={
                'description': 'Use doubled vowels for long vowels',
                'advantages': 'Instant typing on standard keyboards',
                'disadvantages': 'Makes words appear longer'
            }
        )

        # 5. Audit Log
        AuditEvent.objects.get_or_create(
            id=1,
            defaults={
                'actor_name': 'Rohan (Demo)',
                'action': 'project.created',
                'target_type': 'Project',
                'target_id': 1
            }
        )

        self.stdout.write(self.style.SUCCESS("Demo data successfully seeded!"))
