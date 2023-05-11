const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (_, { user, params }, { res }) => {
            try {
                const foundUser = await User.findOne({
                    $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
                });

                if (!foundUser) {
                    throw new Error('Cannot find a user with this id!');
                }

                return foundUser;
            } catch (error) {
                res.status(400);
                throw error;
            }
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }

            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { body }, context) => {
            const { user } = context;

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                throw new Error('Could not save book.');
            }
        },
        deleteBook: async (parent, { bookId }, context) => {
            const { user } = context;
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error("Couldn't find user with this id!");
            }
            return updatedUser;
        }
    },
};


module.exports = resolvers;