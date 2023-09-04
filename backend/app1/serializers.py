from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        
    # Take the post from the client and create a new user    
    def save(self, **kwargs):
        new_user = User.objects.create_user(
            username = self.validated_data['username'],
            email = self.validated_data['email'],
            password = make_password(self.validated_data['password']),
        )
        
        new_user.save()
        
        # then create a new token for the user
        new_token = Token.objects.create(user=new_user)      
        