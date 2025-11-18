from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class KarmaTransaction(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="karma_transactions",
    )
    points = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    # Generic foreign key to link to the source (e.g., a Post)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    source = GenericForeignKey("content_type", "object_id")

    def __str__(self):
        return f"{self.points} karma for {self.user.username}"


class Badge(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    # icon = models.ImageField(upload_to="badges/", null=True, blank=True)

    def __str__(self):
        return self.name


class UserBadge(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="badges"
    )
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    awarded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "badge")

    def __str__(self):
        return f"{self.user.username} - {self.badge.name}"
