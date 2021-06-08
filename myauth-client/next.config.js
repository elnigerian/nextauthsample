require('dotenv').config();

module.exports = {
    env: {
        // Reference a variable that was defined in the .env file and make it available at Build Time
        NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
    future: {
        webpack5: true,
    },
}
