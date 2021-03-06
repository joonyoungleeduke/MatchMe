from django.contrib import admin
from Posts.models import Post, Comment, UserHeart, UserMatch

admin.site.register(UserHeart)
admin.site.register(UserMatch)
admin.site.register(Post)
admin.site.register(Comment)