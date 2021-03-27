from django.urls import path
from Profiles.views import ProfileViewSet
from Accounts.views import UserViewSet 

user_list = UserViewSet.as_view({
    'get': 'list',
})
user_detail = UserViewSet.as_view({
    'get': 'retrieve',
})
user_comments = UserViewSet.as_view({
    'get': 'get_user_comments',
})
user_posts = UserViewSet.as_view({
    'get': 'get_user_posts',
})

profiles_detail = ProfileViewSet.as_view({
    'get': 'retrieve',
})
profiles_update = ProfileViewSet.as_view({
    'post': 'update',
})
profiles_list = ProfileViewSet.as_view({
    'get': 'list',
})

urlpatterns = [
    path('', user_list, name='user-list'),
    path('<int:pk>/', user_detail, name='user-detail'),
    path('<int:pk>/comments/', user_comments, name='user-comments'),
    path('<int:pk>/posts/', user_posts, name='user-posts'),
    path('<int:pk>/profile/', profiles_detail, name='profiles-detail'),
    path('<int:pk>/profile/update/', profiles_update, name='profiles-update'),
    path('profiles/', profiles_list, name="profiles-list"),

]