from rest_framework import serializers
from .models import LearningQuest, LearningLesson, LearningProgress

class LearningLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningLesson
        fields = ['id', 'title', 'order', 'content']

class LearningQuestSerializer(serializers.ModelSerializer):
    lessons = LearningLessonSerializer(many=True, read_only=True)

    class Meta:
        model = LearningQuest
        fields = ['id', 'title', 'description', 'difficulty', 'xp_reward', 'icon', 'lessons']

class LearningProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningProgress
        fields = ['id', 'user', 'quest', 'completed', 'xp_earned', 'completed_at']
