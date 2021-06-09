const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (context) => {
    const authorizationHeaders = context.req.headers.authorization;
    // console.log("+++++++++++++++++++", authorizationHeaders)
    if(authorizationHeaders) {
        try {
            let token = authorizationHeaders;
            // console.log("+++++++++++++++++++", token);
            const user = jwt.verify(token, process.env.SECRET_KEY);
            return user;
        }
        catch(error){
            throw new AuthenticationError('Invalid/Expired token');
        }
    }
    throw new Error('Authorization header must be provided');
}
