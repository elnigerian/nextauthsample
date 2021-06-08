import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';
import UserService from '../../modules/user/service/userService';
// import VerificationService from '../../modules/user/service/verificationService';
import UserResolver from '../../modules/user/resolver/userResolver';

// service registration
Container.set({ id: UserService, type: UserService });
// resolver registration
Container.set({ id: UserResolver, type: UserResolver });

// Container.set('VERIFICATION_SERVICE', () => VerificationService);
export const createSchema = () => {
    return buildSchema({
        resolvers: [
            UserResolver
        ],
        container: Container,
        validate: false
    });
}
