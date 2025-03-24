import os
from django.core.asgi import get_asgi_application

# Ustawienia Django przed jakimikolwiek importami
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django_asgi_app = get_asgi_application()

# Teraz importujemy inne elementy
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from simplechat.routing import websocket_urlpatterns

# Konfiguracja aplikacji ASGI
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})