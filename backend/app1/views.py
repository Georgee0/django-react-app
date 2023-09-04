from django.shortcuts import render 
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password


# Create your views here.
@api_view(['GET'])
def index(request):
    
    return Response({"success": "Request was successful"})

@api_view(['GET'])
def getUsers(request):
    get_user = User.objects.all()
    serializer = UserSerializer(get_user, many=True)

    return Response(serializer.data)

@api_view(['GET','POST'])
def createUsers(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save() 
        return Response({"success": "User created successfully"}, status=201)
    else:
        return Response(serializer.errors, status=400)
    
@api_view(['DELETE'])
def deleteUsers(request, user_id):
    # user_id = request.data.get(user_id)
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return Response({"success":"User was successfully deleted"}, status=201)
    except User.DoesNotExist:
        return Response({"Error":"The user does not exist"}, status=404)
    
    
@api_view(['GET'])
def getUser(request):
    user_id = request.data.get('user_id')
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"Error":"User does not exist"}, status=404)
    
@api_view(['PUT'])
def updateUser(request):
    user_id = request.data.get('user_id')
    get_new_username = request.data.get('new_username')
    get_new_email = request.data.get('new_email')
    get_new_password = request.data.get('new_password')
    try:
        user = User.objects.get(id=user_id)
        
        if get_new_username:
            user.username = get_new_username
        
        if get_new_email:
            user.email = get_new_email
            
        if get_new_password:
            user.password = get_new_password
        
        user.save()
        return Response({"Success":"User updated successfully"})
    
    except User.DoesNotExist:
        return Response({"Error":"User does not exist"}, status=404)
    
 
 
 #    User Authentication




@api_view(['POST'])
def signup(request):
    data = request.data
    
    # validates the data sent by the client
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        
        # getting the user that was created along with the token for the user
        user = User.objects.get(username=data['username'])
        token = Token.objects.get(user=user)
        
        # serialize the user 
        serializer = UserSerializer(user)
        data = {
            "user": serializer.data,
            "token": token.key
        }
        

        return Response(data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    data = request.data
    
    # Check if what was typed exist in the db
    authenticate_user = authenticate(username=data['username'], password=data['password'])
    
    # check if the user is authenticated then return user
    if authenticate_user is not None:
        user = User.objects.get(username=data['username'])
        serializer = UserSerializer(user)
        
        # retrieve the token or create another token upon login 
        token, create_token = Token.objects.get_or_create(user=user)
        
        response_data = {
            "user": serializer.data,
        }

        if token:
            response_data['token'] = token.key
        elif create_token:
            response_data['token'] = create_token.key
            
        return Response(response_data)
            
           
    return Response({"details": "Not found"}, status=status.HTTP_400_BAD_REQUEST)




# This view is to let a logged in user access certain pages... feels good🤗
@api_view(['GET'])

#check if the user is authenticated to access certain views
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def TestView(request):
    return Response({"message": "Test view page"})


@api_view(['GET'])
#check if the user is authenticated then delete the token in order to logout the user
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    
    return Response({"message": "logout was successful"})