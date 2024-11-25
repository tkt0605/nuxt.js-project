from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from .views import IndexAPI
router = routers.DefaultRouter()
# router.register('hello', IndexAPI(), basename="api_hello")
urlpatterns = [
    path('', include(router.urls)),
    path('hello/', IndexAPI.as_view(), name='api-hello'),
]

if settings.DEBUG:
    urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)