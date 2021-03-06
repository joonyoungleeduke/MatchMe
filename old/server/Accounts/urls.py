from django.urls import path, include 
from Accounts.views import RegisterViewSet, LogoutView, UserViewSet
from rest_framework_simplejwt import views as jwt_views 

user_create = RegisterViewSet.as_view({
    'post': 'create',
})
user_id = UserViewSet.as_view({
    'get': 'get_user_id',
})

urlpatterns = [
    path('user/id/', user_id, name='user-id'),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'), # login
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), # periodic refresh
    path('register/', user_create, name='register'), 
    path('logout/', LogoutView.as_view(), name='logout'),
]