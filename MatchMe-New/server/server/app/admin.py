from django.contrib import admin
from django.contrib.auth.models import User 
from server.app.models import Profile 

# Register your models here.
admin.site.unregister(User)
admin.site.register(Profile)