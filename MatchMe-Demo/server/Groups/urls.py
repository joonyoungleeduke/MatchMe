from django.urls import path, include 
from Groups.views import GroupViewSet

posts_from_group = GroupViewSet.as_view({
    'get': 'get_posts',
})
groups_list = GroupViewSet.as_view({
    'get': 'list',
})
groups_detail = GroupViewSet.as_view({
    'get': 'retrieve',
})
groups_update = GroupViewSet.as_view({
    'post': 'update',
})
groups_create = GroupViewSet.as_view({
    'post': 'create',
})
groups_action = GroupViewSet.as_view({
    'post': 'perform_action',
})
groups_users = GroupViewSet.as_view({
    'get': 'get_users',
})
groups_of_user = GroupViewSet.as_view({ # groups that the user is in 
    'get': 'users_groups', 
})
groups_suggestion = GroupViewSet.as_view({
    'get': 'get_suggestions',
})

group_action_total = GroupViewSet.as_view({
    'get': 'get_actions',
})
group_match_total = GroupViewSet.as_view({
    'get': 'get_matches',
})

group_total_users = GroupViewSet.as_view({
    'get': 'total_users',
})

add_member = GroupViewSet.as_view({
    'put': 'add_user',
})

remove_member = GroupViewSet.as_view({
    'put': 'remove_user',
})

similar_groups = GroupViewSet.as_view({
    'get': 'get_similar',
})

urlpatterns = [
    path('groups/', groups_list, name='groups-list'),
    path('groups/<int:pk>/', groups_detail, name='groups-detail'),
    path('groups/users/total/<int:pk>/', group_total_users, name='group-users-total'),
    path('groups/actions/<int:pk>/', group_action_total, name='group-action-total'),
    path('groups/matches/<int:pk>/', group_match_total, name='group-match-total'),
    path('groups/<int:pk>/posts/', posts_from_group, name='groups-posts'), # USE THIS TO GET POSTS
    path('groups/<int:pk>/actions/', groups_action, name='groups-action'),
    path('groups/<int:pk>/update/', groups_update, name='groups-update'),
    path('groups/create/', groups_create, name='groups-create'),
    path('groups/users/', groups_users, name='groups-users'),
    path('groups/user/<int:pk>/', groups_of_user, name='groups-of-user'),
    path('groups/user/<int:pk>/suggestions/', groups_suggestion, name='group-suggestions'),

    path('groups/<int:pk>/add_user/<int:user_id>/', add_member, name='add-member'),
    path('groups/<int:pk>/remove_user/<int:user_id>/', remove_member, name='remove-member'),

    path('groups/similar/<int:pk>/', similar_groups, name='similar-groups'),
]