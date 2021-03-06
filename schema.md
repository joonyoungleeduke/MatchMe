Query {

* login(username: String): User 
* register(username: String): User 
* user(id: ID): User
* users: [User]
* createPost(user_id: ID, group_id: ID, title: String, body: String, target_matches: Int): Post  
* editPost(...inners of create_post): Post 
* deletePost(user_id: ID, post_id: ID): Post 
* post(post_id: ID): Post 
* posts(user_id: ID): [Post]
* createMatch(user_id: ID, post_id: ID)
* removeMatch(user_id: ID, match_id: ID): Match 
* match(match_id: ID): Match
* matches(user_id: ID): [Match]
* createGroup(user_id: ID, name: String, description: String): Group 
* editGroup(...inners of create_group): Group 
* leaveGroup(user_id: ID, group_id: ID): Group
* deleteGroup(user_id: ID, group_id: ID): Group
* group(group_id: ID): Group 
* groups(user_id: ID): [Group]

}

Post {

* id: ID 
* title: String 
* body: String 
* targetMatches: Int 

* author: User 
* group: Group 

* matches: [Match]

}

User {

* id: ID 
* name: String 
* username: String 
* matchesDone: [Match]
* posts: [Post]
* groups: [Group]

}

Match {

* id: ID 

* owner: User 

* post: Post

}

Group {

* id: ID 
* name: String
* description: String 

* owner: User 
* posts: [Post]

* users: [User!]

}