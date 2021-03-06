from django.db import models

class User(models.Model):
  first_name = models.CharField(max_length = 50)
  last_name = models.CharField(max_length = 50)
  username = models.CharField(max_length = 100)
  bio = models.TextField()

class Group(models.Model):
  name = models.CharField(max_length = 50)
  description = models.TextField()
  theme = models.CharField(max_length = 50)
  owner = models.ForeignKey(
    User, related_name = 'group', on_delete = models.CASCADE
  )
  members = models.ManyToManyField(
    User, related_name = 'groups' 
  )
  
class Post(models.Model): 
  title = models.CharField(max_length = 50)
  body = models.TextField()
  target_matches = models.IntegerField()
  owner = models.ForeignKey(
    User, related_name = 'posts', on_delete = models.CASCADE 
  )
  group = models.ForeignKey(
    Group, related_name = 'posts', on_delete = models.CASCADE
  )

class Comment(models.Model):
  owner = models.ForeignKey(
    User, related_name = 'comments', on_delete = models.CASCADE
  )
  post = models.ForeignKey(
    Post, related_name = 'comments', on_delete = models.CASCADE 
  )
  
class Match(models.Model):
  owner = models.ForeignKey(
    User, related_name = 'matches', on_delete = models.CASCADE
  )
  post = models.ForeignKey(
    Post, related_name = 'matches', on_delete = models.CASCADE
  )
  
class Heart(models.Model):
  owner = models.ForeignKey(
    User, related_name = 'hearts', on_delete = models.CASCADE
  )
  post = models.ForeignKey(
    Post, related_name = 'hearts', on_delete = models.CASCADE
  )