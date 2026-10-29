from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'display_name',
            'role',
            'learning_xp',
            'review_xp',
            'avatar_url',
            'date_joined',
        ]
        read_only_fields = ['id', 'learning_xp', 'review_xp', 'date_joined']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'display_name']

    def create(self, validated_data):
        email = validated_data['email']
        username = email.split('@')[0]
        user = User.objects.create_user(
            username=username,
            email=email,
            password=validated_data['password'],
            display_name=validated_data.get('display_name', username)
        )
        return user
