import {Query, Resolver} from "type-graphql";
import {User} from "../../../entity/user";
import UserService from "../service/userService";
import {Inject} from "typedi";

@Resolver()
export default class UserResolver {

    constructor(
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
    async getUserByEmailAddress(emailAddress: string): Promise<User | null> {
        return this.userService.findUserByEmailAddress(emailAddress);
    }
}
