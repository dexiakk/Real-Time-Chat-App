from django.db import models
from users.models import CustomUser

# Create your models here.
class Chat(models.Model):
    chat_id = models.CharField(max_length=50, unique=True)
    users = models.ManyToManyField(CustomUser, related_name="chats", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.chat_id
    
class Message(models.Model):
    chat = models.ForeignKey("Chat", on_delete=models.CASCADE, related_name="messages", default=1)
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="messages")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.username}: {self.content[:20]} ({self.timestamp.strftime('%H:%M:%S')})"
    