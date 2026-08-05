from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({
        "status": "online",
        "message": "Django REST API Portal Berita Berjalan dengan Sukses!",
        "frontend_url": "http://localhost:3000/",
        "endpoints": {
            "categories": "/api/v1/categories/",
            "articles": "/api/v1/articles/",
            "comments": "/api/v1/comments/",
            "admin_panel": "/admin/"
        }
    })

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/v1/', include('news.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

