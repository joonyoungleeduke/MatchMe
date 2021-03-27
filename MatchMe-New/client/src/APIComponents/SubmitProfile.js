import React from "react";
import axiosInstance from "../User/axiosApi";

async function SubmitProfile(data) {
    try {
        const user_id = localStorage.getItem('user_id')

        const response = await axiosInstance.post('api/users/' + user_id.toString() + '/profile/update/', {
            user: user_id, 
            bio: data.bio, 
            preference1: data.preference1, 
            preference2: data.preference2, 
            preference3: data.preference3, 
            image: data.image, 
        })
        
        return response; 

    } catch (error) {
        console.log(error);
    }
};

export default SubmitProfile;


// class Profile(models.Model):
//     user = models.OneToOneField(User, on_delete=models.CASCADE)
//     bio = models.TextField(blank=True, default='')
//     ind_matches = models.IntegerField(blank=True, default=0)
//     total_matches = models.IntegerField(blank=True, default=0)

//     preference1 = models.CharField(max_length=100)
//     preference2 = models.CharField(max_length=100)
//     preference3 = models.CharField(max_length=100)

//     image = models.ImageField(upload_to='profile_pictures', default='default_profile.jpg')

// urlpatterns = [
//     path('', user_list, name='user-list'),
//     path('<int:pk>/', user_detail, name='user-detail'),
//     path('<int:pk>/comments/', user_comments, name='user-comments'),
//     path('<int:pk>/posts/', user_posts, name='user-posts'),
//     path('<int:pk>/profile/', profiles_detail, name='profiles-detail'),
//     path('<int:pk>/profile/update', profiles_update, name='profiles-update'),
//     path('profiles/', profiles_list, name="profiles-list"),

// ]

// path('api/users/', include(profiles_urls)),
