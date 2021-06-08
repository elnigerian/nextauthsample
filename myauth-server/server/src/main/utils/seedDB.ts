/*
 * Populate the DB with data for validation/testing purposes
 *
 * Data used is the users array.
 */
import {User} from '../entity/user';
import crypto from 'crypto'

export const seedUserData: any[] = [
    {
        id: 1,
        username: "bond",
        password: "bond",
        firstName: "james",
        lastName: "bond",
        emailAddress: "jamesbond@mi6.co.uk"
    }, {
        id: 2,
        username: "em",
        password: "money",
        firstName: "money",
        lastName: "penny",
        emailAddress: "moneypenny@mi6.co.uk"
    }, {
        id: 3,
        username: "quw",
        password: "queue",
        firstName: "Q",
        lastName: "Queue",
        emailAddress: "q@mi6.co.uk"
    },
]

export const seedDatabase = async () => {
    // note that ormconfig dropSchema flag is set to true
    // hence there isn't a check for duplicates because the DB is dropped
    // for every restart of the server
    console.log(`Start seeding ...`);
    for( const item of seedUserData ) {
        const user:User = item;
        user.salt = crypto.randomBytes(16).toString('hex');
        user.password = crypto
            .pbkdf2Sync(user.password, user.salt, 1000, 64, 'sha512')
            .toString('hex')

        await User.save(user).then((result: any) => console.log(`User ${result.username} saved with ID: ${result.userId}`))
    }
    console.log(`Seeding finished.`);
}