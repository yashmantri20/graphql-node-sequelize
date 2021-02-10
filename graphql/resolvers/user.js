const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../../database/models");

module.exports = {
    Mutation: {
        async register(_, args) {
            const { name, email, password } = args.input;
            console.log(args.input);
            return User.create({ name, email, password });
        },

        async login(_, { input }) {
            const { email, password } = input;
            const user = await User.findOne({ where: { email } });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, "mySecret");
                return { ...user.toJSON(), token };
            }
            throw new AuthenticationError("Invalid credentials");
        },
    },
};

