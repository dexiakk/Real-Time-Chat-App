import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime
from channels.layers import get_channel_layer
from .models import Chat, Message
from channels.db import database_sync_to_async
from users.models import CustomUser

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self): 
        
        self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]

        try:
            self.chat = await database_sync_to_async(Chat.objects.get)(chat_id=self.chat_id)
        except Chat.DoesNotExist:
            await self.close()
            return
        
        self.room_group_name = f"chat_{self.chat_id}"
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        username = data["username"]
        message = data["message"]
        
        c = datetime.now()
        czas = c.strftime('%H:%M:%S')

        chat = self.chat

        user = await database_sync_to_async(CustomUser.objects.get)(username=username)

        await database_sync_to_async(Message.objects.create)(
            chat = chat,
            sender = user,
            content = message
        )
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'username': username,
                'message': message,
                'czas': czas
            }
        )
        
        # await self.send(text_data=json.dumps({"message": f"message: Serwer dostal informacje ze: {message}, o czasie {czas}"}))
    
    async def chat_message(self, event):
        message = event['message']
        
        await self.send(text_data=json.dumps({
            'username': event["username"],
            'message': event["message"],
            'czas': event["czas"]
        }))