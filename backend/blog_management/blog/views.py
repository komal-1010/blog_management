from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Blog.objects.all()
        return Blog.objects.filter(status='published')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)