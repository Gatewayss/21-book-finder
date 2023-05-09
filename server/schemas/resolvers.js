const { User } = require('../models');

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
        createUser: async () => {

        },
        login: async () => {

        },
        saveBook: async () => {

        },
        deleteBook: async () => {

        },
    },
};

module.exports = resolvers;