from django.db import models
from django.contrib.auth.models import User

class ActionGroup(models.Model):
    owner = models.ForeignKey(User, related_name='group_creator', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField()
    closed = models.BooleanField(default=False)
    members = models.ManyToManyField(User, related_name='group_users')
    mods = models.ManyToManyField(User, related_name='group_mods')
    admins = models.ManyToManyField(User, related_name='admin_mods')
    created = models.DateTimeField(auto_now_add=True)

    theme = models.CharField(max_length=100)

    image = models.ImageField(upload_to='group_pictures', default='default_group.jpg')
    
    def total_members(self):
        return self.members.count() 

    def is_admin(self, user):
        return user in self.admins or user == creator 
    
    def is_mod(self, user):
        return user in self.mods

