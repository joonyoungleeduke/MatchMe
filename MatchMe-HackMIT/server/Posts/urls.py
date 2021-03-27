from django.urls import path, include 
from Posts.views import PostViewSet, CommentViewSet, HeartViewSet, MatchViewSet

posts_list = PostViewSet.as_view({
    'get': 'list',
})
posts_detail = PostViewSet.as_view({
    'get': 'retrieve',
})
posts_update = PostViewSet.as_view({
    'post': 'update',
})
posts_create = PostViewSet.as_view({
    'post': 'create',
})
post_comments = PostViewSet.as_view({
    'get': 'get_post_comments',
})
comments_create = CommentViewSet.as_view({
    'post': 'create_comment',
})
comments_update = CommentViewSet.as_view({
    'post': 'update',
})
hearts = PostViewSet.as_view({
    'get': 'get_hearts',
})
matches = PostViewSet.as_view({
    'get': 'get_matches',
})
posts_action = PostViewSet.as_view({
    'post': 'perform_action',
})
posts_interests = PostViewSet.as_view({
    'get': 'get_post_preferences',
})
posts_specific = PostViewSet.as_view({
    'get': 'get_specific_posts',
})

heart_create = HeartViewSet.as_view({
    'post': 'create',
})
match_create = MatchViewSet.as_view({
    'post': 'create',
})
heart_remove = HeartViewSet.as_view({
    'post': 'unheart',
})
match_remove = MatchViewSet.as_view({
    'post': 'unmatch',
})

post_hearted = PostViewSet.as_view({
    'get': 'check_heart',
})
post_matched = PostViewSet.as_view({
    'get': 'check_match',
})

similar_posts = PostViewSet.as_view({
    'get': 'similar_posts',
})

popular_posts = PostViewSet.as_view({
    'get': 'popular_posts',
})

theme_posts = PostViewSet.as_view({
    'get': 'theme_posts', 
})

all_themes = PostViewSet.as_view({
    'get': 'all_themes'
})

urlpatterns = [
    path('posts/', posts_list, name='posts-list'),
    path('posts/interests/<int:pk>/<int:limit>/', posts_interests, name='posts-interests'),
    path('posts/specific/<int:pk>/<int:limit>/', posts_specific, name='posts-specific'),
    path('posts/<int:pk>/', posts_detail, name='posts-detail'),
    path('posts/<int:pk>/matches/', matches, name='posts-matches'),
    path('posts/<int:pk>/hearts/', hearts, name='posts-hearts'),
    path('posts/<int:pk>/actions/', posts_action, name='posts-action'),
    path('posts/<int:pk>/update/', posts_update, name='posts-update'),
    path('posts/create/', posts_create, name='posts-create'),
    path('posts/<int:pk>/comments/', post_comments, name='posts-comments'),
    path('posts/<int:pk>/comments/create/', comments_create, name='comments-create'),
    path('comments/<int:pk>/update/', comments_update, name='comments-update'), # necessitated change in server/urls.py
    path('heart/create/', heart_create, name='heart-create'),
    path('match/create/', match_create, name='match-create'),
    path('posts/<int:pk>/hearted/<int:user_id>/', post_hearted, name='heart-check'),
    path('posts/<int:pk>/matched/<int:user_id>/', post_matched, name='match-check'),
    path('heart/remove/<int:post_id>/<int:user_id>/', heart_remove, name='heart-remove'),
    path('match/remove/<int:post_id>/<int:user_id>/', match_remove, name='match-remove'),
    path('posts/similar/<int:pk>/<int:post_id>/', similar_posts, name='posts-similar'),
    path('posts/trending/', popular_posts, name='posts-trending'),
    path('posts/<str:theme>/', theme_posts, name='theme-posts'),
    path('posts/theme/<str:theme>/', theme_posts, name='theme-posts'),

    path('themes/', all_themes, name='all-themes'),
]