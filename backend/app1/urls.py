from django.urls import path
from . import views

urlpatterns = [
    #Routes for normal CRUD operation
    path('', views.index),
    path('getusers/', views.getUsers),
    path('createusers/', views.createUsers),
    path('deleteusers/<int:user_id>/', views.deleteUsers, name='deleteUsers'),
    path('get-user/', views.getUser),
    path('updateuser/', views.updateUser),
    
    #Routes for user authentication
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('test-view/', views.TestView, name='TestView'),
    path('logout/', views.logout, name='logout'),
]
