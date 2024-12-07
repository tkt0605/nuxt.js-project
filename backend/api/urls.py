from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenBlacklistView, TokenRefreshView, TokenObtainPairView
from rest_framework import routers
from .views import IndexAPI,LogoutView, EmailLoginView, RegisterView
router = routers.DefaultRouter()
# router.register('hello', IndexAPI(), basename="api_hello")
urlpatterns = [
    path('', include(router.urls)),
    path('hello/', IndexAPI.as_view(), name='api-hello'),
    path('login/', EmailLoginView.as_view(), name='api-login'),
    path('logout/', LogoutView.as_view(), name="api-logout"),
    path('token/', TokenObtainPairView.as_view(), name='token_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/logout/', TokenBlacklistView.as_view(), name='token_logout'),
    path('signup/', RegisterView.as_view(), name='signup'),
]

if settings.DEBUG:
    urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)