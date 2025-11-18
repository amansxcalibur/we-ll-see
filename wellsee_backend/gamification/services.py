from django.contrib.contenttypes.models import ContentType
from django.db import transaction

from wellsee_backend.interactions.models import Interaction
from wellsee_backend.posts.models import Post

from .models import KarmaTransaction


@transaction.atomic
def award_karma_for_post(post: Post):
    """
    Awards karma to the post author, believers, and doubters for a completed post.

    - Author gets karma: (2 * number of doubters) + (1 * number of believers)
    - Believers of the post get +1 karma.
    - Doubters of the post get -1 karma.

    This function ensures that karma is awarded only once per post.
    """
    # Check if karma has already been awarded for this post
    content_type = ContentType.objects.get_for_model(Post)
    if KarmaTransaction.objects.filter(
        content_type=content_type, object_id=post.id
    ).exists():
        return

    # Award karma to post author
    points_for_author = (post.doubts * 2) + post.believes
    if points_for_author > 0:
        # Create a transaction record
        KarmaTransaction.objects.create(
            user=post.user, points=points_for_author, source=post
        )
        # Update author's total karma
        author = post.user
        author.karma += points_for_author
        author.save(update_fields=["karma"])

    # Award/deduct karma for believers/doubters
    interactions = Interaction.objects.filter(post=post).select_related("user")
    for interaction in interactions:
        user = interaction.user
        if interaction.interaction_type == "BELIEVE":
            points = 1
        elif interaction.interaction_type == "DOUBT":
            points = -1
        else:
            continue

        # Create a transaction record
        KarmaTransaction.objects.create(user=user, points=points, source=post)

        # Update user's total karma
        user.karma += points
        user.save(update_fields=["karma"])
