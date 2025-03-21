from rest_framework import serializers
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import ToDOList, addToDO, Library, LibraryToDO, LibraryToken, LibraryAddToDO
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','code_name' , 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            code_name = validated_data['code_name'],
            password=validated_data['password']
        )
        return user
class EmailLoginSerializer(serializers.Serializer):
    email = serializers.EmailField
    password = serializers.CharField(write_only=True)
    def validate(self, data):
        user = User.objects.filter(email=data['email']).first()
        if user and user.check_password(data['password']):
            return user
        raise serializers.ValidationError('Invalid Email or Password')
class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    def validate(self, data):
        self.token = data['refresh']
        return data
    def save(self, **kwargs):
        RefreshToken(self.token).blacklist()
class ToDOListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDOList
        fields = '__all__'
class AddToDOSerializer(serializers.ModelSerializer):
    class Meta:
        model = addToDO
        fields = '__all__'
class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = '__all__'
class LibraryToDOSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryToDO
        fields = '__all__'
class LibraryTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryToken
        fields = '__all__'
class libraryAddToDOSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryAddToDO
        fields = "__all__"
