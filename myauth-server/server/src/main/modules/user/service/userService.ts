import {Service} from "typedi";
import {User} from "../../../entity/user";
import {getConnection} from "typeorm";
import {UserInputType} from "../input-types/userInputType";

@Service('USER_SERVICE')
class UserService {
    async findUser(searchDetails: UserInputType): Promise<User[] | null> {
        return getConnection().manager.getRepository(User).find({
            where: {
                ...searchDetails,
            },
        }).catch(() => {
            return null;
        });
    }

    /**
     *
     */
    async findAllUsers(): Promise<User[] | []> {
        return getConnection().manager.getRepository(User).find().catch(() => []);
    }

    /**
     *
     */
    async findUserByEmailAddress(emailAddress: string): Promise<User | null> {
        return getConnection().manager.getRepository(User).findOne({
            where : {
                emailAddress
            }
        }).catch(() => null);
    }
}

export default UserService;
