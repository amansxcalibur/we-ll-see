from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer

class PostCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = PostSerializer(
            data=request.data, 
            context={'request': request}
        )
        if serializer.is_valid():
            # Associate post with authenticated user
            post = serializer.save(user=request.user)
            return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
