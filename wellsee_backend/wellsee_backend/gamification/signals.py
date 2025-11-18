from django.db.models.signals import post_save
from django.dispatch import receiver

from wellsee_backend.posts.models import Post

from .services import award_karma_for_post


@receiver(post_save, sender=Post)
def on_post_completed(sender, instance, created, **kwargs):
    """
    Listens for a Post being saved and awards karma if its status is 'completed'.
    """
    if instance.status == "completed":
        award_karma_for_post(instance)
