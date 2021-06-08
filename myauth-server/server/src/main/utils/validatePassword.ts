import crypto from 'crypto';

export async function validatePassword(user:any, inputPassword:any) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex');
    return user.hash === inputHash;
}