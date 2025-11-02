from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterView, SweetViewSet # 1. Import SweetViewSet

# --- 2. Create a router ---
router = DefaultRouter()
# --- 3. Register your ViewSet with the router ---
router.register(r'sweets', SweetViewSet, basename='sweet')

urlpatterns = [
    # Auth endpoints
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    
    # --- 4. Add the router's URLs to your urlpatterns ---
    # This one line automatically creates all the following:
    # GET /api/sweets/
    # POST /api/sweets/
    # GET /api/sweets/<id>/
    # PUT /api/sweets/<id>/
    # DELETE /api/sweets/<id>/
    path('', include(router.urls)),
]