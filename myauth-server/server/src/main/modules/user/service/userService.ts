import { Service } from 'typedi';
import {User} from '../../../entity/user';
import {getConnection} from 'typeorm';
import {UserInputType} from '../input-types/userInputType';

@Service('USER_SERVICE')
export default class UserService {
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
        return getConnection().manager.getRepository(User)
            .find()
            .then((results: any) => {
                if(!results) {
                    return []
                }
                return results;
            })
            .catch(() => []);
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

    /**
     *
     */
    async findUserByUsername(username: string): Promise<User | null> {
        return getConnection().manager.getRepository(User).findOne({
            where : {
                username
            }
        }).catch(() => null);
    }
};
