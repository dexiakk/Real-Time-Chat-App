from django.urls import path, include
from .views import GetChatId, GetChatMessages

urlpatterns = [
    path('get-chat-id/<str:user1>/<str:user2>/', GetChatId.as_view(), name="get-chat-id"),
    path('chat/get-messages/<str:chat_id>/', GetChatMessages.as_view(), name="get-messages"),
]
