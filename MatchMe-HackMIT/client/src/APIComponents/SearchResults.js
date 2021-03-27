import React from "react";
import axiosInstance from "../User/axiosApi";
import AllGroups from "../APIComponents/AllGroups";
import AllUsers from "../APIComponents/AllUsers";
import AllProfiles from "../APIComponents/AllProfiles";
import UserGroups from "../APIComponents/UserGroups";

async function SearchResults() { // this provides all the search results for the search bar 

    let groups = await AllGroups(); // for now search results are just other groups and users 
    let users = await AllUsers();
    let profiles = await AllProfiles(); 
    
    let results = Array();
    let idx; 
    let obj; 

    for (idx in groups) {
        obj = {
            "title": groups[idx].name,
            "description": groups[idx].description, 
            "image": groups[idx].image, 
            "theme": groups[idx].theme,
        }
        results.push(obj);
    }

    for (idx in users) {
        obj = {
            "title": users[idx].first_name + " " + users[idx].last_name,
            "description": profiles[idx].bio,
            "image": profiles[idx].image, 
            "total_matches": profiles[idx].total_matches, 
        }
        results.push(obj);
    }

    return results; 

}


export default SearchResults;


    // const SuggestedGroups = (props) => {
    //     return(
    //         <Card>
    //             <Card.Content header='Suggested Groups' />
    //             <Card.Content extra>
    //               <div class="ui middle aligned selection list">
    //                 {props.groups.map(group => (
    //                   <div class="item">
    //                     <img class="ui avatar image" src={group.image}/>
    //                     <div class="content">
    //                 <div class="header">{group.name}</div>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </div>
    //             </Card.Content>
    //         </Card>
    //     );
    // }
    