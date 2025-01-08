from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.perform_create, name="create_blog"),
    path('read/', views.get_queryset, name="read_blog"),
    path('update/<int:pk>/', views.update_blog, name="update_blog"),
    path('delete/<int:pk>/', views.delete_blog, name="delete_blog"),
]
