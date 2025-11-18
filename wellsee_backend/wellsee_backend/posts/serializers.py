from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id', 'user', 'content', 'deadline', 
            'image', 'status', 'proof_media'
        ]
        extra_kwargs = {
            'user': {'read_only': True}
        }
