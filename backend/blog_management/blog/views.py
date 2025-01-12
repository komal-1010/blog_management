from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .models import Blog
from .serializers import BlogSerializer
from django.shortcuts import get_object_or_404

# Function to create a blog
@api_view(['POST'])
def perform_create(request):
    if request.method == 'POST':
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Function to read blogs
@api_view(['GET'])
def get_queryset(request):
    if request.user.is_staff:
        blogs = Blog.objects.all()  # Admin can view all blogs
    else:
        blogs = Blog.objects.filter(status='published')  # Only published blogs for regular users

    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

# Function to read a particular blog by id
@api_view(['GET'])
def get_blogById(request, pk):
    # Fetch the blog by primary key (pk) or return 404 if not found
    blog = get_object_or_404(Blog, pk=pk)

    # Serialize the blog and return the response
    serializer = BlogSerializer(blog)
    return Response(serializer.data)

# Function to update a blog
@api_view(['PUT'])
def update_blog(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user is the author or is an admin
    if request.user != blog.author and not request.user.is_staff:
        return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = BlogSerializer(blog, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Function to delete a blog
@api_view(['DELETE'])
def delete_blog(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user is the author or is an admin
    if request.user != blog.author and not request.user.is_staff:
        return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

    blog.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
