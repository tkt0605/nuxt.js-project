from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IslibraryMember
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import EmailLoginSerializer, LogoutSerializer, RegisterSerializer, ToDOListSerializer, AddToDOSerializer, UserSerializer, LibrarySerializer, LibraryToDOSerializer
from .models import CustomUser, ToDOList, addToDO, LibraryToDO, Library
from rest_framework import generics, viewsets
# import environ
# env = environ.Env()
# api_key_GPT = env('api_key_GPT')
# def GPT_titile_summary(request):


User = get_user_model()
class CustomUserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class CustomUserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = ToDOListSerializer
class CustomUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ToDOListSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ToDOViewset(viewsets.ModelViewSet):
    queryset = ToDOList.objects.all()
    serializer_class = ToDOListSerializer
    permission_classes = [IsAuthenticated]

class LibraryViewset(viewsets.ModelViewSet):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer
    permission_classes = [IsAuthenticated, IslibraryMember]

class ToDOsListView(generics.ListCreateAPIView):
    queryset = ToDOList.objects.all()
    serializer_class = ToDOListSerializer
    permission_classes = [IsAuthenticated]
class ToDODetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ToDOList.objects.all()
    serializer_class = ToDOListSerializer
    permission_classes = [IsAuthenticated]
class AddToDOViewset(viewsets.ModelViewSet):
    queryset = addToDO.objects.all()
    serializer_class =AddToDOSerializer
class AddToDOListView(generics.ListCreateAPIView):
    queryset = addToDO.objects.all()
    serializer_class = AddToDOSerializer
class AddToDODetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = addToDO.objects.all()
    serializer_class = AddToDOSerializer
class LibraryListDetail(generics.ListCreateAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer
class LibraryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer

class IndexAPI(APIView):
    def get(self, request):
        return Response({'message': 'Hello world!!!!'})
class EmailLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = EmailLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response(serializer.errors, status=400)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Successfully Logout"}, status=200)
        return Response(serializer.errors, status=400)
def delete_todo(request, id):
    try:
        todo = ToDOList.objects.get(id=id)
        todo.delete()
        return Response({'message': "削除成功"})
    except ToDOList.DoesNotExist:
        return ({"error": "ToDOが見つかりません。"})
    except Exception as e:
        return ({"error": str(e)})
