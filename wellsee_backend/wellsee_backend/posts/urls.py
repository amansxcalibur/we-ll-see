from django.urls import path

from .views import PostDetailView, PostsView

app_name = "posts"

urlpatterns = [
    path("", PostsView.as_view(), name="post-create"),
    path("<int:pk>/", PostDetailView.as_view(), name="post-detail"),
]
