const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        pins: [Pin!]!
        pin(id: ID!): Pin
        users: [User!]!
        user(id: ID!): User 
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Mutation {
        userSignUp(registerInput: RegisterInput): User! 
        userLogIn(email: String!, password: String!): User!
        addPin(title: String!, description: String!, imageURL: String!, userId: String!): Pin!
        deletePin(id: ID!): String!
    }

    type Pin {
        id: ID!
        title: String!
        description: String!
        imageId: String!
        userId: String!
        user: User!

    }

    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        pins: [Pin!]
    }
`;

module.exports = typeDefs;

// const {
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLSchema,
//     GraphQLID,
//     GraphQLInt,
//     GraphQLList,
//     GraphQLNonNull } = graphql;

// const PinType = new GraphQLObjectType({
//     name: 'Pin',
//     fields: () => ({
//         id: { type: GraphQLID },
//         title: { type: GraphQLString },
//         description: { type: GraphQLString },
//         imageId: { type: GraphQLString },
//         user: {
//             type: UserType,
//             resolve(parent, args) {
//                 return User.findById(parent.userId);
//             }
//         }
//     })
// });

// const UserType = new GraphQLObjectType({
//     name: 'user',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         pins: {
//             type: new GraphQLList(PinType),
//             resolve(parent, args) {
//                 return Pin.find({ userId: parent.id });
//             }
//         }
//     })

// })

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: () => ({
//         pin: {
//             type: PinType,
//             description: 'A single Pin',
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 // code to get data from db / other source
//                 return Pin.findById(args.id)
//             }
//         },
//         user: {
//             type: UserType,
//             description: 'A single User',
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 return User.findById(args.id)
//             }
//         },
//         pins: {
//             type: new GraphQLList(PinType),
//             resolve(parent, args) {
//                 return Pin.find({})
//             }
//         },
//         users: {
//             type: new GraphQLList(UserType),
//             resolve(parent, args) {
//                 return User.find({})
//             }
//         }
//     })
// });

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: () => ({
//         addUser: {
//             type: UserType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) }
//             },
//             resolve(parent, args) {
//                 let user = new User({
//                     name: args.name
//                 });
//                 return user.save();
//             }
//         },
//         addPin: {
//             type: PinType,
//             args: {
//                 title: { type: new GraphQLNonNull(GraphQLString) },
//                 description: { type: new GraphQLNonNull(GraphQLString) },
//                 userId: { type: new GraphQLNonNull(GraphQLString) },
//                 imageId: { type: new GraphQLNonNull(GraphQLString) }
//             },
//             resolve(parent, args) {
//                 let pin = new Pin({
//                     title: args.title,
//                     description: args.description,
//                     userId: args.userId,
//                     imageId: args.imageId
//                 });
//                 return pin.save();
//             },
//         }
//     })
// })

// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation
// });