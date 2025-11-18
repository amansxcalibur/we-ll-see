from django.urls import path
from .views import (
    user_detail_view,
    user_redirect_view,
    user_update_view,
    RegisterView,
    LoginView,
    ProfileView,
    PublicProfileView
)

app_name = "users"

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/me/", ProfileView.as_view(), name="auth-me"),


    path("~redirect/", user_redirect_view, name="redirect"),
    path("~update/", user_update_view, name="update"),

    path("<str:username>/",user_detail_view , name="detail"),
]
