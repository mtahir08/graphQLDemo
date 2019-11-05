const bcrypt = require('bcrypt');

const User = require('./../../models/user');
const { transformUser } = require('./general');

module.exports = {
    createUser: async (args) => {
        try {
            const userFound = await User.findOne({ email: args.userInput.email })
            if (userFound) {
                throw "User exists already"
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new User({
                email: args.userInput.email,
                password: hashedPassword,
            });

            const result = await newUser.save();
            if (result) {
                return { _id: result._doc._id.toString(), email: result._doc.email };
            }
        } catch (error) {
            throw error;
        }
    },
    user: async userId => {
        try {
            return await user(userId)
        } catch (error) {
            throw error
        }
    },
    users: async () => {
        try {
            const users = await User.find()
            return users.map((user) => transformUser(user))
        } catch (error) {
            throw error
        }
    }
}