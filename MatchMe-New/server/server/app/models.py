from django.db import models
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save 
from django.dispatch import receiver 

class Profile(models.Model):
  owner = models.OneToOneField(User, related_name='profile',on_delete = models.CASCADE)
  bio = models.TextField()

class UserGroup(models.Model):
  group = models.OneToOneField(Group, on_delete = models.CASCADE)
  name = models.CharField(max_length = 50)
  description = models.TextField()
  theme = models.CharField(max_length = 50)
  owner = models.ForeignKey(
    Profile, related_name = 'owned_groups', on_delete = models.CASCADE
  )
  members = models.ManyToManyField(
    Profile, related_name = 'user_groups' 
  )
  
class Post(models.Model): 
  title = models.CharField(max_length = 50)
  body = models.TextField()
  target_matches = models.IntegerField()
  owner = models.ForeignKey(
    Profile, related_name = 'posts', on_delete = models.CASCADE 
  )
  group = models.ForeignKey(
    UserGroup, related_name = 'posts', on_delete = models.CASCADE
  )

class Comment(models.Model):
  owner = models.ForeignKey(
    Profile, related_name = 'comments', on_delete = models.CASCADE
  )
  post = models.ForeignKey(
    Post, related_name = 'comments', on_delete = models.CASCADE 
  )
  
class Match(models.Model):
  owner = models.ForeignKey(
    Profile, related_name = 'matches', on_delete = models.CASCADE
  )
  post = models.ForeignKey(
    Post, related_name = 'matches', on_delete = models.CASCADE
  )
  
class Heart(models.Model):
  owner = models.ForeignKey(
    Profile, related_name = 'hearts', on_delete = models.CASCADE
  )
  post = models.ForeignKey(
    Post, related_name = 'hearts', on_delete = models.CASCADE
  )
  
@receiver(post_save, sender = User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    Profile.objects.create(owner = instance)

@receiver(post_save, sender = User)
def save_user_profile(sender, instance, **kwargs):
  instance.profile.save()