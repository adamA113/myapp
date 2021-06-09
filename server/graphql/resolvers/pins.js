const { AuthenticationError } = require('apollo-server');
require('dotenv').config();

const { cloudinary } = require('../../utils/cloudinary');
const Pin = require('../../database/models/Pin');
const checkAuth = require('../../utils/checkAuth');

const pinsResolvers = {
    Query: {
        pin: async (parent, { id }) => {
            try {
                const post = await Pin.findById(id);
                if (post) {
                    return post;
                }
                throw new Error("Post not found");
            }
            catch (err) {
                throw new Error(err);
            }
        },
        pins: async (parent, args, context) => {
            // console.log("=====", context.req.headers);
            try {
                return await Pin.find({}).sort({ createdAt: -1 });
            }
            catch (err) {
                throw new Error(err);
            }
        },
    },

    Pin: {
        user: (parent) => {
            return User.findById(parent.userId);
        }
    },

    Mutation: {
        addPin: async (parent, { title, description, imageURL }, context) => {
            // console.log(context.req.headers);
            try {
                const user = checkAuth(context);
                // console.log("user", user);
                // const fileStr = imageURL;
                // const uploadedResponse = await cloudinary.uploader.upload(fileStr,
                //     { upload_preset: 'pinterest' }, function (error, result) {
                //         console.log(result);
                //     })
                // res.send(uploadedResponse.public_id)
                let pin = new Pin({
                    title,
                    description,
                    imageId: imageURL,
                    // imageId: uploadedResponse.public_id,
                    userId: user.id

                });
                return pin.save();
            }
            catch (err) {
                throw new Error(err);
            }
        },

        deletePin: async (parent, { id }, context) => {
            const user = checkAuth(context);

            try {
                const pin = await Pin.findById(id);
                if(user.id === pin.userId){
                    await pin.delete();
                    return "Pin has been successfully deleted";
                }
                else{
                    throw new AuthenticationError("You are not authorized to delete this pin");
                }
            }
            catch (err) {
                throw new Error(err);

            }

        }
    }
}

module.exports = pinsResolvers;