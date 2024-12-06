from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, Permission, Group, PermissionsMixin,  AbstractBaseUser
from django.utils import timezone
from django.conf import settings
from rest_framework.authtoken.models import Token
import uuid
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
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = CustomUserManager()
    groups = models.ManyToManyField(Group, related_name="custom_user_group", blank=True, help_text="このユーザーが所属するグループ。ユーザーは、各グループに付与されたすべての権限を取得します", related_query_name="user")
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True, help_text="このユーザーに対する特定の権限", related_query_name="user")
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    def __str__(self):
        return self.email
class ToDOList(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=20, verbose_name='タイトル')
    todo = models.TextField(verbose_name='ToDO')
    created_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.title
    