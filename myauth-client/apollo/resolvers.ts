import {users as baseUsers} from '../lib';

export const resolvers = {
    Query: {
        users(parent, args, context) {
            return baseUsers
        },
        user(parent, { username }) {
            return baseUsers.find((user) => user.username === username)
        },
    },
}