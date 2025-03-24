from django.contrib import admin
from .models import Chat, Message

# Register your models here.
@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ("chat_id", "created_at")
    filter_horizontal = ("users",)

admin.site.register(Message)