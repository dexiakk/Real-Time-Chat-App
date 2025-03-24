from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Chat, Message
from rest_framework.response import Response
from .serializers import ChatSerializer, MessageSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.models import CustomUser

# Create your views here.
class GetChatId(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @staticmethod
    def generate_chat_id(user1, user2):
        return f"{min(user1, user2)}-{max(user1, user2)}"
    
    def get_or_create_chat(self, user1, user2):
        chat_id = self.generate_chat_id(user1.username, user2.username)
        chat, created = Chat.objects.get_or_create(chat_id=chat_id)
        
        if created:
            chat.users.add(user1, user2)
        return chat
    
    def get(self, request, user1, user2):
        user1 = get_object_or_404(CustomUser, username=user1)
        user2 = get_object_or_404(CustomUser, username=user2)

        chat = self.get_or_create_chat(user1, user2)
        return Response({"chat_id": chat.chat_id})
    
    
class GetChatMessages(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, chat_id=None):
        chat = get_object_or_404(Chat, chat_id=chat_id)

        messages = Message.objects.filter(chat=chat).order_by('timestamp')

        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data)

