Query {

* **user(username: String!): User**
* **users: [User]**
* post(post_id: ID): Post 
* posts(): [Post]
* similarPosts(post_id: ID): [Post]
* trendingPosts(): [Post]
* match(match_id: ID): Match
* matches(): [Match]
* group(group_id: ID): Group 
* groups(): [Group]
* similarGroups(group_id: ID): [Group]
* suggestedGroups(group_id: ID): [Group]

}

Mutation {

* **tokenAuth(username: String, password: String): token, payload, refreshExpiresIn**
* **register(username: String, password: String, email: String): User** 
* createPost(group_id: ID, title: String, body: String, target_matches: Int): Post  
* editPost(...inners of create_post): Post 
* deletePost(post_id: ID): Post 
* createMatch(post_id: ID)
* removeMatch(match_id: ID): Match 
* createHeart
* removeHeart 
* createGroup( name: String, description: String, theme: String): Group 
* editGroup(...inners of create_group): Group 
* leaveGroup(group_id: ID): Group
* deleteGroup(group_id: ID): Group

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