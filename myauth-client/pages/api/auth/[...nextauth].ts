import NextAuth, {NextAuthOptions} from 'next-auth';
import Providers from 'next-auth/providers';
import {getErrorMessage} from '../../../lib/getGQLErrorMessage';
import {SignInDocument} from "../../../generated/apolloComponents";
import {initializeApollo} from "../../../apollo/client";

const authOptions: NextAuthOptions = {
    providers: [
        // Providers.GitHub({
        // clientId: process.env.GITHUB_ID,
        // clientSecret: process.env.GITHUB_SECRET,
        // }),
        Providers.Credentials({
            id: 'credentials',
            name: 'Credentials',
            type: "credentials",
            credentials: {
                email: { label: "Email Address", type: "email", placeholder: "john.doe@example.com"},
                // todo - mask password; appears visible on credentials object
                password: { label: "Password", type: "password", placeholder: "Your super secure password" }
            },
            async authorize(credentials: any) {
                const client = initializeApollo();
                let emailAddress = credentials.email;
                let password = credentials.password;

                try {
                    await client.resetStore();
                    const {data} = await client.mutate({
                        mutation: SignInDocument,
                        variables: {
                            username: emailAddress,
                            password
                        }
                    });
                    console.log(`The result returned`, JSON.stringify(data, null, 2));
                    if ( !data && !data.signIn ) {
                        return null;
                    }
                    const user = data.signIn;
                    // const user = await findUserByEmailAddress(emailAddress);
                    console.log(`The user returned`, JSON.stringify(user, null, 2));
                    if (!user) {
                        return null;
                    }
                    console.log(`The user returned`, JSON.stringify(user, null, 2));
                    // const isValid = await verifyPassword(credentials.password, user.password);

                    // if (!isValid) {
                    //     throw new Error('Incorrect password');
                    // }
                    return user; // {id: user.id, username: user.username, email: user.emailAddress, name: user.firstName};
                } catch (error: any) {
                    console.error(getErrorMessage(error))
                }
            }
        })
    ],

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 /** 24 * 60 * 60*/, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 /** * 60 * 60 */, // 24 hours
    },
    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
        // Set to true to use encryption (default: false)
        encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        signIn: '/auth/signIn',  // Displays sign in buttons
        signOut: '/auth/signOut', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        // async session(session, user) { return session },
        // async jwt(token, user, account, profile, isNewUser) { return token }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: true,
}


const nextAuth = NextAuth(authOptions);

export default nextAuth;
