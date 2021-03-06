from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone 
from django.core.validators import MaxValueValidator, MinValueValidator
from Groups.models import ActionGroup


class UserMatch(models.Model):

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usermatch')
    match_post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name='usermatch')
    created = models.DateTimeField(auto_now_add=True)

class UserHeart(models.Model):

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
    post = models.ForeignKey("Post", on_delete = models.CASCADE, related_name='+')
    created = models.DateTimeField(auto_now_add=True)

class Post(models.Model): # post -- regular or match by isMatch boolean 

    content = models.TextField(blank=False, default='') # action
    reason = models.TextField(blank=True, default='') # reason for caring 

    hearts = models.ManyToManyField(User, blank=True, through=UserHeart, related_name='heart_user')

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post')
    group = models.ForeignKey(ActionGroup, on_delete=models.CASCADE, related_name='post')
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    image = models.ImageField(upload_to='post_images', default='default_group.jpg')
    link = models.TextField(blank=True, default='')

    isMatch = models.BooleanField(blank=True, default=False)
    matches = models.ManyToManyField(User, blank=True, through=UserMatch, related_name='match_user')
    goal = models.IntegerField(
        blank=True,
        default=10,
        validators=[
            MinValueValidator(10),
            MaxValueValidator(100000),
        ],
    )    

    def __str__(self):
        return f'Post by {self.author} with {self.hearts} hearts'
    
    class Meta: 
        ordering = ['-created']

class Comment(models.Model):

    content = models.TextField(blank=False, default='')
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta: 
        ordering = ['created']
    
    def __str__(self):
        return f'Comment {self.content} by {self.author}'