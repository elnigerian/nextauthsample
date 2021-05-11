import _ from 'lodash';

type User = {
    id?: any
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

const users: User[] = [
    {
        id: 1,
        username: "bond",
        password: "bond",
        firstName: "james",
        lastName: "bond",
        emailAddress: "jamesbond@mi6.co.uk"
    }, {
        id: 2,
        username: "M",
        firstName: "money",
        lastName: "penny",
        emailAddress: "moneypenny@mi6.co.uk"
    }, {
        id: 3,
        username: "Q",
        firstName: "Q",
        lastName: "",
        emailAddress: "q@mi6.co.uk"
    },

]

const findUserByEmailAddress: any = async (emailAddress: string) => _.filter(users, (user: any) => user.emailAddress === emailAddress)[0];
const findUserByFirstName: any = async (first: string) => _.filter(users, (user: any) => user.firstName === first)[0];
const findUserByLastName: any = async (last: string) => _.filter(users, (user: any) => user.lastName === last)[0];


export { users, findUserByEmailAddress, findUserByFirstName, findUserByLastName};
