const { AuthenticationError, UserInputError } = require('apollo-server');

const Pin = require('../../database/models/Pin');
const checkAuth = require('../../utils/checkAuth');

const commentsResolvers = {
    Query: {},

    Mutation: {
        addComment: async (parent, { pinId, body }, context) => {

            if (body.trim() === '') {
                throw new UserInputError('Empty comment');
            }

            const user = checkAuth(context);

            const pin = await Pin.findById(pinId);

            if (pin) {
                pin.comments.push({
                    username: user.username,
                    body,
                    createdAt: new Date().toISOString()
                })

                await pin.save();
                return pin;
            }
            else {
                throw new UserInputError('Pin not found');
            }
        },

        deleteComment: async (parent, { pinId, commentId }, context) => {
            const user = checkAuth(context);

            const pin = await Pin.findById(pinId);

            if (pin) {
                const commentIndex = pin.comments.findIndex((comment) => comment.id === commentId);

                if (user.username === pin.comments[commentIndex].username) {
                    pin.comments.splice(commentIndex, 1);

                    await pin.save();
                    return pin;
                }
                else {
                    throw new AuthenticationError('Action not allowed')
                }

            }
            else {
                throw new UserInputError('Pin not found');
            }
        }
    },
}

module.exports = commentsResolvers;
