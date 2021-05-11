import {buildSchema} from 'type-graphql';
import {Container} from "typedi";
import UserService from "../../modules/user/service/userService";
import UserLoginService from "../../modules/user/service/userLoginService";
import VerificationService from "../../modules/user/service/verificationService";
import UserResolver from "../../modules/user/resolver/userResolver";

Container.set('USER_SERVICE', () => UserService);
Container.set('USER_LOGIN_SERVICE', () => UserLoginService);
Container.set('VERIFICATION_SERVICE', () => VerificationService);

export const createSchema = () => {
    return buildSchema({
        resolvers: [
            UserResolver
        ],
        container: Container,
        validate: false,
    });
}
