from django.db import models
from users.models import User

class Post(models.Model):
    STATUS_CHOICES = [
        ('wellsee', 'Wellsee'),
        ('completed', 'Completed'),
    ]
    
    user = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    content = models.TextField()
    deadline = models.DateField()
    image = models.ImageField(upload_to='posts/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='wellsee')
    proof_media = models.ImageField(upload_to='proofs/', null=True, blank=True)
    
    def __str__(self):
        return f"Post by {self.user.username}"
