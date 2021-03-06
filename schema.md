Query {

* login(username: String): User 
* user(id: ID): User
* users: [User]
* post(post_id: ID): Post 
* posts(user_id: ID): [Post]
* similarPosts(post_id: ID): [Post]
* trendingPosts(): [Post]
* match(match_id: ID): Match
* matches(user_id: ID): [Match]
* group(group_id: ID): Group 
* groups(user_id: ID): [Group]
* similarGroups(group_id: ID): [Group]
* suggestedGroups(group_id: ID): [Group]

}

Mutation {

* register(username: String): User 
* createPost(user_id: ID, group_id: ID, title: String, body: String, target_matches: Int): Post  
* editPost(...inners of create_post): Post 
* deletePost(user_id: ID, post_id: ID): Post 
* createMatch(user_id: ID, post_id: ID)
* removeMatch(user_id: ID, match_id: ID): Match 
* createGroup(user_id: ID, name: String, description: String, theme: String): Group 
* editGroup(...inners of create_group): Group 
* leaveGroup(user_id: ID, group_id: ID): Group
* deleteGroup(user_id: ID, group_id: ID): Group

}

Post {

* id: ID 
* title: String 
* body: String 
* targetMatches: Int 

* owner: User 
* group: Group 

* matches: [Match]
* hearts: [Heart]

}

User {

* id: ID 
* profilePicture: Img 
* firstName: String 
* lastName: String 
* username: String  
* bio: String 
* hearts: [Heart]
* matchesDone: [Match]
* posts: [Post]
* groups: [Group]

}

Match {

* id: ID 

* owner: User 

* post: Post

}

Heart {

* id: ID
* owner: User
* post: Post 

}

Group {

* id: ID 
* name: String
* description: String 
* theme: String 

* owner: User 
* members: [User]
* posts: [Post]

}

Comment {

* id: ID
* owner: User
* post: Post 

}