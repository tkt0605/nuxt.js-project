from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, Permission, Group, PermissionsMixin,  AbstractBaseUser
from django.utils import timezone
from django.conf import settings
from rest_framework.authtoken.models import Token
import uuid
from .blockchain import BlockChain
blockchain = BlockChain()
def generate_avatar_url(email):
    """メールアドレスを基にアバター URL を生成"""
    seed = email.split("@")[0] if email else "default"
    return f"https://api.dicebear.com/7.x/identicon/svg?seed={seed}"
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=False, **extra_fields):
        if not email:
            raise ValueError('Emailは絶対に必要です。')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    avatar = models.URLField(blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = CustomUserManager()
    groups = models.ManyToManyField(Group, related_name="custom_user_group", blank=True, help_text="このユーザーが所属するグループ。ユーザーは、各グループに付与されたすべての権限を取得します", related_query_name="user")
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True, help_text="このユーザーに対する特定の権限", related_query_name="user")
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def save(self, *args, **kwargs):
        """新規作成時に `avatar` が空なら `email` から生成"""
        if not self.avatar:
            self.avatar = generate_avatar_url(self.email)
        super().save(*args, **kwargs)
    def __str__(self):
        return self.email
class ToDOList(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, blank=True)
    auther = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=True , related_name='todos')
    todo = models.TextField(verbose_name='ToDO')
    checklist = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return str(self.id)
class addToDO(models.Model):
    todo_tag = models.ForeignKey(ToDOList, on_delete=models.CASCADE, null=True, related_name="tasks")
    todo = models.TextField(verbose_name="Add ToDO")
    checklist = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.todo
class Library(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, blank=False)
    owner =  models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='Owner')
    members = models.ManyToManyField(CustomUser, related_name='libraries')
    goal = models.TextField(verbose_name="goal", blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    def save(self, *args, **kwargs):
        if not self.id:
            if not self.members.exists():
                return ValueError('メンバーは最低一人必要です。')
        super().save(*args, **kwargs)

        blockchain.add_member(self.id, self.owner.id)
        for member in self.members.all():
            blockchain.add_member(self.id, member.id)
    def add_member(self, user):
        if user not in self.members.all():
            self.members.add(user)
            blockchain.add_member(self.id, user.id)
            self.save()
    def __str__(self):
        return str(self.id)

class LibraryToDO(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, blank=True)
    tag = models.ForeignKey(Library, on_delete=models.CASCADE, null=True, related_name="LibraryId")
    todo = models.TextField(verbose_name="task")
    auther = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name="HeaderToDO作者")
    checklist = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return str(self.id)

class LibraryAddToDO(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tag = models.ForeignKey(LibraryToDO, on_delete=models.CASCADE, null=True, related_name="LibraryToDOのタグ")
    todo = models.TextField(verbose_name="ADD-Lib-todo")
    auther = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name="AddToDO作者")
    checklist = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now())
    def __str__(self):
        return str(self.id)
class LibraryToken(models.Model):
    library = models.OneToOneField(Library, on_delete=models.CASCADE, related_name="token")
    token = models.CharField(max_length=256, unique=True, default=uuid.uuid4)
    def __str__(self):
        return str(self.library)
