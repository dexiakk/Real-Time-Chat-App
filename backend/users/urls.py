from django.urls import path, include
from .views import RegisterView, LoginView, GetUserDetails, GetAllUsers
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("login/", LoginView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("get-user/", GetUserDetails.as_view(), name="get-user"),
    path("get-all-users/", GetAllUsers.as_view(), name="get-all-users")
]
