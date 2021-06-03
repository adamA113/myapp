const pinsResolvers = require('./pins');
const usersResolvers = require('./users');

module.exports = {

    Query: {
        ...usersResolvers.Query,
        ...pinsResolvers.Query,   
    },

    Mutation: {
        ...usersResolvers.Mutation,
        ...pinsResolvers.Mutation,
    }
}