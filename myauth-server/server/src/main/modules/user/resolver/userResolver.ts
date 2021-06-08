
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../../entity/user';
import UserService from '../service/userService';
import { Inject } from 'typedi';

@Resolver()
export default class UserResolver {

    constructor (
        // constructor injection of a service
        @Inject(() => UserService) private readonly userService: UserService,
    ) {}

    /**
     *
     */
    @Query(() => [User])
    async getAllUsers(): Promise<User[] | []> {
        return this.userService.findAllUsers();
    }

    /**
     *
     * @param emailAddress
     */
    @Query(() => User, {nullable: true})
    async getUserByEmailAddress(@Arg('emailAddress') emailAddress: string): Promise<User | null> {
        return this.userService.findUserByEmailAddress(emailAddress);
    }

    /**
     *
     * @param username
     */
    @Query(() => User, {nullable: true})
    async getUserByUsername(@Arg('username') username: string): Promise<User | null> {
        return this.userService.findUserByUsername(username);
    }

    @Mutation(() => User, {nullable: true})
    async signIn(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() context: any
    ): Promise<User | null> {
        let user: User;

        user = await this.userService.findUserByEmailAddress(username);
        // verify object is not null
        if(!user) {
            return null;
        }
        // user is not null...verify password
        // todo: if password is encrypted/hashed, ensure appropriate step below
        const valid = user.password === password;
        if(!valid) {
            return null;
        }

        return user;
    }
}
