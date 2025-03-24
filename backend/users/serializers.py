from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'username', 'avatar', 'bio', 'is_online', 'last_seen', 'friends']

    def get_friends(self, obj):
        friends = obj.friends.all()
        return [{"username": friend.username, "avatar": friend.avatar.url if friend.avatar else None} for friend in friends]
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = get_user_model()
        fields = ['email', 'username', 'password']
        
    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        
        return user
    
class LoginSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    
class UserPublicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'avatar']
    