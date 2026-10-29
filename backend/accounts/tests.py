from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, UserRole

class AccountsAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_registration(self):
        data = {
            'email': 'newuser@demo.lipisabha.org',
            'password': 'testpassword123',
            'display_name': 'New Tester'
        }
        response = self.client.post('/api/auth/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], 'newuser@demo.lipisabha.org')
        self.assertEqual(response.data['display_name'], 'New Tester')

    def test_login_success(self):
        user = User.objects.create_user(
            username='existing',
            email='existing@demo.lipisabha.org',
            password='securepassword'
        )
        response = self.client.post('/api/auth/login/', {
            'email': 'existing@demo.lipisabha.org',
            'password': 'securepassword'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'existing@demo.lipisabha.org')

    def test_login_invalid_password(self):
        User.objects.create_user(
            username='existing2',
            email='existing2@demo.lipisabha.org',
            password='securepassword'
        )
        response = self.client.post('/api/auth/login/', {
            'email': 'existing2@demo.lipisabha.org',
            'password': 'wrongpassword'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
