require('dotenv').config();

const { cloudinary } = require('../../utils/cloudinary');
const Pin = require('../../database/models/Pin');

const pinsResolvers = {
    Query: {
        pin: (parent, args) => {
            console.log(parent);
            return Pin.findById(args.id)
        },
        pins: (parent, args) => {
            return Pin.find({})
        },
    },
    
    Pin: {
        user: (parent) => {
            return User.findById(parent.userId)
        }
    },

    Mutation: {
        addPin: async (parent, { title, description, imageURL, userId }) => {
            console.log(userId);
            try {
                const fileStr = imageURL;
                // console.log("=====", fileStr)
                const uploadedResponse = await cloudinary.uploader.upload(fileStr,
                    { upload_preset: 'pinterest' }, function (error, result) {
                        console.log(result);
                    })
                // res.send(uploadedResponse.public_id)
                let pin = new Pin({
                    title,
                    description,
                    imageId: uploadedResponse.public_id,
                    userId

                });
                return pin.save();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = pinsResolvers;