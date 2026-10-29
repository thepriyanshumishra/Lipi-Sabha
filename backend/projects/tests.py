from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Project, WritingSystem

class ProjectsAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.project = Project.objects.create(
            name='Test Project',
            description='Test description',
            language_label='Test Language'
        )
        WritingSystem.objects.create(
            project=self.project,
            name='Latin Test',
            description='Test system',
            script_code='Latn'
        )

    def test_list_projects(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_project_detail(self):
        response = self.client.get(f'/api/projects/{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Project')
        self.assertEqual(len(response.data['writing_systems']), 1)
