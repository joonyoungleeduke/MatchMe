from django.db import models
from django.contrib.auth.models import User, Group
from django.dispatch import receiver 
from django.db.models.signals import post_save

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, default='')
    ind_matches = models.IntegerField(blank=True, default=0)
    total_matches = models.IntegerField(blank=True, default=0)

    preference1 = models.CharField(max_length=100)
    preference2 = models.CharField(max_length=100)
    preference3 = models.CharField(max_length=100)

    image = models.ImageField(upload_to='profile_pictures', default='default_profile.jpg')

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created: 
        Profile.objects.create(user=instance).save() 