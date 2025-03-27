from rest_framework import serializers
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import ToDOList, addToDO, Library, LibraryToDO, LibraryToken, LibraryAddToDO, CustomUser
User = get_user_model()
class AutherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['code_name', 'avatar']  # 必要に応じて他のフィールドも追加
# class TitleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ToDOList
#         fields = ["title"]
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

class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDOList
        fields = ["id", "title"]
class AddToDOSerializer(serializers.ModelSerializer):
    todo_tag = serializers.SlugRelatedField(
        queryset = ToDOList.objects.all(),
        slug_field = "id"
    )
    class Meta:
        model = addToDO
        fields = '__all__'
class AddToDOReadSerializer(serializers.ModelSerializer):
    todo_tag = TitleSerializer(read_only=True)
    class Meta:
        model = addToDO
        fields = "__all__"

class LibrarySerializer(serializers.ModelSerializer):
    owner = serializers.SlugRelatedField(
        queryset = CustomUser.objects.all(),
        slug_field = "code_name"
    )
    members = serializers.SlugRelatedField(
        queryset = CustomUser.objects.all(),
        slug_field = "code_name",
        many = True,
    )
    class Meta:
        model = Library
        fields = '__all__'
class LibraryTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryToken
        fields = '__all__'

class LibraryToDOSerializer(serializers.ModelSerializer):
    auther = serializers.SlugRelatedField(
        queryset = CustomUser.objects.all(),
        slug_field = "code_name",
    )
    class Meta:
        model = LibraryToDO
        fields = '__all__'
class LibraryToDOReadSerializer(serializers.ModelSerializer):
    auther = AutherSerializer(read_only=True)
    class Meta:
        model = LibraryToDO
        fields = "__all__"
class libraryAddToDOSerializer(serializers.ModelSerializer):
    auther = serializers.SlugRelatedField(
        queryset = CustomUser.objects.all(),
        slug_field = "code_name",
    )
    class Meta:
        model = LibraryAddToDO
        fields = "__all__"
class LibraryAddToDOReadSerializer(serializers.ModelSerializer):
    auther = AutherSerializer(read_only=True)
    class Meta:
        model = LibraryAddToDO
        fields = "__all__"
