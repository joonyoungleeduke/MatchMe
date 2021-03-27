import React from "react";
import GroupInfo from "../APIComponents/GroupInfo";
import UserInfo from "../APIComponents/UserInfo";
import ProfileInfo from "../APIComponents/ProfileInfo";
import AllPostComments from "../APIComponents/AllPostComments";
import ParseComments from "../APIComponents/ParseComments";
import axiosInstance from "../User/axiosApi";
import GroupActions from "../APIComponents/GroupActions";
import GroupMatches from "../APIComponents/GroupMatches";
import GroupUserTotal from "../APIComponents/GroupUserTotal";

async function ParseGroup(data) {

    try {
        data['actions'] = await GroupActions(data.id);
        data['matches'] = await GroupMatches(data.id); 
        data['total_users'] = await GroupUserTotal(data.id);

        return data; 

    } catch (error) {
        console.log(error); 
    }
}

export default ParseGroup;


// function GroupInfo(group_id) {
//     async function groupDetailFetch(group_id) {
//         try {
//             const response = await axiosInstance.get('api/groups/' + group_id.toString() + "/");

//             return response.data; 

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return groupDetailFetch(group_id);

// }


// export default GroupInfo;


// path('groups/actions/<int:pk>/', group_action_total, name='group-action-total'),
// path('groups/matches/<int:pk>/', group_match_total, name='group-match-total'),


// class ActionGroup(models.Model):
//     owner = models.ForeignKey(User, related_name='group_creator', on_delete=models.CASCADE)
//     name = models.CharField(max_length=50)
//     description = models.TextField()
//     closed = models.BooleanField(default=False)
//     members = models.ManyToManyField(User, related_name='group_users')
//     mods = models.ManyToManyField(User, related_name='group_mods')
//     admins = models.ManyToManyField(User, related_name='admin_mods')
//     created = models.DateTimeField(auto_now_add=True)

//     theme = models.CharField(max_length=100)

//     image = models.ImageField(upload_to='group_pictures', default='default_group.jpg')
    
//     def total_members(self):
//         return self.members.count() 

//     def is_admin(self, user):
//         return user in self.admins or user == creator 
    
//     def is_mod(self, user):
//         return user in self.mods


