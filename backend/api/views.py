from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IslibraryMember
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import EmailLoginSerializer, LogoutSerializer, RegisterSerializer, ToDOListSerializer, AddToDOSerializer, UserSerializer, LibrarySerializer, LibraryToDOSerializer, LibraryTokenSerializer, libraryAddToDOSerializer, LibraryAddToDOReadSerializer, LibraryToDOReadSerializer
from .models import CustomUser, ToDOList, addToDO, LibraryToDO, Library, LibraryToken, LibraryAddToDO
from rest_framework import generics, viewsets
from django.shortcuts import get_object_or_404
User = get_user_model()
@csrf_exempt
@login_required
def generate_token(request, library_id):
    try:
        library = Library.objects.get(id=library_id)
        token, created = LibraryToken.objects.get_or_create(library=library)
        return JsonResponse({"success": True, "token": token.token})
    except Library.DoesNotExist:
        return JsonResponse({"success": False, "message": "ライブラリが見つかりません"})
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)})

@csrf_exempt
@login_required
def join_library_with_token(request):
    try:
        data = json(request.body)
        user = request.user
        token_input = data.get("token")
        try:
            library_token = LibraryToken.objects.get(token=token_input)
            library = library_token.library
        except LibraryToken.DoesNotExist:
            return JsonResponse({"success": False, "message": "無効なトークン"})
        if user in library.members.all():
            return JsonResponse({"success": False, "message": "既にトークンが存在"})
        library.members.add(user)
        return JsonResponse({"success": True, "message": "ライブラリに参加！"})
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)})



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
    permission_classes = [IsAuthenticated]

class LibraryTokenViewset(viewsets.ModelViewSet):
    queryset = LibraryToken.objects.all()
    serializer_class = LibraryTokenSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"
    def get_object(self):
        # id = self.kwargs.get("library_id")
        id = self.kwargs.get("id")
        # library = get_object_or_404(Library, id=id)
        return get_object_or_404(LibraryToken, id=id)

# class LibraryTodoViewset(viewsets.ModelViewSet):
#     queryset = LibraryToDO.objects.all()
#     serializer_class = LibraryToDOReadSerializer
#     permission_classes = [IsAuthenticated]

# class LibraryAddToDOViewset(viewsets.ModelViewSet):
#     queryset = LibraryAddToDO.objects.all()
#     serializer_class = libraryAddToDOSerializer
#     permission_classes = [IsAuthenticated]

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
class LibraryTokenListView(generics.ListCreateAPIView):
    queryset = LibraryToken.objects.all()
    serializer_class = LibraryTokenSerializer
class LibraryTodoListView(generics.ListCreateAPIView):
    queryset = LibraryToDO.objects.all()
    serializer_class = LibraryToDOSerializer
class LibraryAddToDOListView(generics.ListCreateAPIView):
    queryset = LibraryAddToDO.objects.all()
    serializer_class = libraryAddToDOSerializer

class AddToDODetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = addToDO.objects.all()
    serializer_class = AddToDOSerializer
class LibraryListDetail(generics.ListCreateAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer
class LibraryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer
class LibraryTokenDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LibraryToken.objects.all()
    serializer_class = LibraryTokenSerializer
class LibraryTodoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LibraryToDO.objects.all()
    serializer_class = LibraryToDOSerializer
class LibraryAddToDODetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LibraryAddToDO.objects.all()
    serializer_class = libraryAddToDOSerializer
class IndexAPI(APIView):
    def get(self, request):
        return Response({'message': 'Hello world!!!!'})


class LibraryTodoViewset(viewsets.ModelViewSet):
    queryset = LibraryToDO.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return LibraryToDOReadSerializer
        return LibraryToDOSerializer

class LibraryAddToDOViewset(viewsets.ModelViewSet):
    queryset = LibraryAddToDO.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return LibraryAddToDOReadSerializer
        return libraryAddToDOSerializer
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
def serivce_heathy():
    return JsonResponse({"status": "ok"})
