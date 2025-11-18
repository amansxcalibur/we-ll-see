from django.db import models
from users.models import User


class Post(models.Model):
    user = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    content = models.TextField()
    deadline = models.DateField()
    image = models.ImageField()
    status = models.TextChoices("StatusChoices", "wellsee completed")
    proof_media = ImageField(null=True, blank=True)
