const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
require('dotenv').config();

const { cloudinary } = require('../utils/cloudinary');
const Pin = require('../database/models/Pin');
const User = require('../database/models/User');

const { validateUserLogIn, validateUserSignUp } = require('../utils/validators')

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
}

const resolvers = {
    Query: {
        pin: (parent, args) => {
            console.log(parent);
            return Pin.findById(args.id)
        },

        user: (parent, args) => {
            return User.findById(args.id)

        },

        pins: (parent, args) => {
            return Pin.find({})
        },

        users: (parent, args) => {
            return User.find({})
        }
    },

    Pin: {
        user: (parent) => {
            return User.findById(parent.userId)
        }
    },

    User: {
        pins: (parent) => {
            return Pin.find({ userId: parent.id })
        }
    },
    Mutation: {
        userSignUp: async (parent, { registerInput: { username, email, password, confirmPassword } }) => {
            const { valid, errors } = validateUserSignUp(
                username,
                email,
                password,
                confirmPassword
            );

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ email })
            if (user) {
                throw new UserInputError('username is already taken', {
                    errors: {
                        email: 'This email is already registered'
                    }
                })
            }

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            const newUser = await User.create({ username, email, password });
            const token = generateToken(newUser);

            return {
                ...newUser._doc,
                id: newUser._id,
                token
            };
        },
        userLogIn: async (parent, { email, password }) => {
            const { errors, valid } = validateUserLogIn(email, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ email });
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Bad crendetials';
                throw new UserInputError('Bad crendetials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };


        },

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

module.exports = resolvers;