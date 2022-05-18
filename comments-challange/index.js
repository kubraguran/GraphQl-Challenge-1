const { ApolloServer, gql } = require('apollo-server'); 
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const {nanoid} = require('nanoid');
const {users, posts, comments} = require('./data')



const typeDefs = gql`

    type User {
        id: ID!,
        fullName:String!,
        age:Int!,
        posts: [Post!]!
        comments:[Comment!]! 
    }

    input CreateUserInput{
    fullName: String!
    age:Int!,
    }

    input UpdatedUserInput{
        fullName:String,
        age:Int,
    }

    type Post {
        id:ID!,
        title:String!,
        user_id:ID!
        user:User!,
        comments:[Comment]!
    }
 
    input CreatePost{
    title: String!, 
    user_id: ID!
  }

    input UpdatePostInput { 
        title:String, 
        user_id: ID,
    }

    type Comment {
        id:ID!,
        text:String!,
        post_id:ID!,
        user:User!,
        post:Post!
    }

    input CreateComment{
        text:String!,
        post_id:ID!,
        user_id:ID!

    }

    input UpdateCommentInput {
        text:String,
        post_id:ID,
        user_id:ID

    }

    type DeleteAllOutput {
        count: Int! 
    }
   
    
    type Query {
        users:[User!]!,
        user(id :ID!): User!,

        posts:[Post!]!,
        post(id:ID!): Post!


        comments:[Comment! ]!
        comment(id:ID!):Comment!
       }

       type Mutation{

       createUser(data: CreateUserInput!) : User!
       updateUser(id: ID!, data: UpdatedUserInput!): User!
       deleteUser(id:ID!):User!
       deleteAllUsers:DeleteAllOutput!

       createPost(data:CreatePost!) : Post!
       updatePost(id:ID!,data:  UpdatePostInput!): Post!
       deletePost(id:ID!):Post!
       deleteAllPosts:DeleteAllOutput!

       createComment(data: CreateComment!):Comment!
       updateComment(id:ID! data: UpdateCommentInput!): Comment!
       deleteComment(id:ID!):Comment
       deleteAllComments:DeleteAllOutput!
       
       }

       
`;  


const resolvers = {
    Mutation: {
        createUser: (parent,{data}) => {
            const user = {
                id: nanoid(), 
                ...data
                }
            users.push(user);
            return user ; 
        },
        updateUser: (parent, {id, data}) => {
       const user_index = users.findIndex((user) => user.id === id)
       if(user_index === -1){
           throw new Error("User does not exist!")
       }

       const updated_user = users[user_index] = {
            ...users[user_index],
            ...data
        }

          return  updated_user;
        },
        deleteUser: (parent,{id}) => {
            const user_index = users.findIndex((user) => user.id === id);

            if(user_index === -1 ){
                throw new Error("Does not exist")
            }
            const deleted_user = users[user_index];
            users.splice(user_index,1);
            return deleted_user;
         

        },
        deleteAllUsers:() => {
            const length = users.length;
            users.splice(0, length);

            return {
                count: length,
            };

        },


        createPost:(parent, {data}) => {
            const post = {
                id:nanoid(),
                ...data
            }
            posts.push(post);
            return post;
        },
        updatePost:(parent, {id, data}) => {
            const post_index = posts.findIndex((post) => post.id === id);

            if(post_index === -1){
                throw new Error("Post Does not Exist!")
            }

            const updated_post = posts[post_index] = {
                ...posts[post_index],
                ...data
            }
            return updated_post;
        },
        deletePost:(parent,{id}) => {
            const post_index = posts.findIndex((post) => post.id === id);

            if(post_index === -1){
                throw new Error("Does not exist")
            }

            const deleted_post = posts[post_index];
            posts.splice(post_index, 1);
            return deleted_post;

        },
        deleteAllPosts:() => {
            const length = posts.length;
             posts.splice(0, length);

             return {
                 count: length,
             };
        },


        createComment:(parent, {data}) => {
            const comment = {
                id:nanoid(),
                ...data
            }
           comments.push(comment);
           return comment 
        },
        updateComment:(parent, {id, data}) => {
            const comment_index = comments.findIndex((comment) => comment.id === id);

            if(comment_index === -1){
                throw new Error("Comment Does not Exist!")
            }
            const updated_comment = comments[comment_index] ={ 
                ...comments[comment_index],
                ...data
            }
            return updated_comment;
        },
        deleteComment:(parent,{id}) => {
            const comment_index = comments.findIndex((comment) => comment.id === comment);

            if(comment_index === -1){
                throw new Error ("Does not exist")
            }
            const delete_comment = comments[comment_index];
            comments.splice(comment_index,1);
            return delete_comment;

        },
        deleteAllComments:() => {
            const length = comments.length;
            comments.splice(0, length);

            return {
                count:length
            }
        },


        },

       
      Query: {
          users: () => users,
          user: (parent,args) => users.find(user => user.id === args.id),
          comment: (parent,args) => comments.find((comment) => comment.user_id === args.id),


          posts: () => posts,
          post: (parent,args) => posts.find((post) => post.id === args.id),
 

          comments: () => comments,
          comment: (parent,args) => comments.find((comment) => comment.id === args.id),
      },

      User: {
          posts : (parent, args) =>  posts.filter((post) => post.user_id === parent.id),     
        },

        Post: {
            user: (parent,args) => users.find((user) => user.id === parent.user_id),
            comments: (parent, args) => comments.filter((comment) => comment.post_id === parent.id),
        },
        Comment: {
            user: (parent,args) => users.find((user) => user.id === parent.user_id),
            post: (parent,args) => posts.find((post) => post.id === parent.post_id),
        },
       

    };



    const server = new ApolloServer({ typeDefs, resolvers,plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})]});
    server.listen().then(({ url }) => {
          console.log(`🚀  Server ready at ${url}`);
        });