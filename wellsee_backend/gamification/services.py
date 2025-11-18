from django.contrib.contenttypes.models import ContentType
from django.db import transaction

from wellsee_backend.posts.models import Post

from .models import KarmaTransaction


@transaction.atomic
def award_karma_for_post(post: Post):
    """
    Awards karma to a user for a completed post.

    This function calculates karma points based on the number of believes,
    creates a KarmaTransaction, and updates the user's total karma score.
    It ensures that karma is awarded only once per post.
    """
    # Check if karma has already been awarded for this post
    content_type = ContentType.objects.get_for_model(Post)
    if KarmaTransaction.objects.filter(
        content_type=content_type, object_id=post.id
    ).exists():
        return

    # Karma calculation logic: 1 point per believe
    points_to_award = post.believes

    if points_to_award > 0:
        # Create a transaction record
        KarmaTransaction.objects.create(user=post.user, points=points_to_award, source=post)

        # Update user's total karma
        user = post.user
        user.karma += points_to_award
        user.save(update_fields=["karma"])
