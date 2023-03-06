import jwt from 'jsonwebtoken';
import { auth } from '../config';

export async function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, auth.jwt.secret, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }
            resolve(decodedToken)
        })
    })
}

export async function createJWToken(id, email, access_token, username, role) {
    let expiresIn = 86400; // 1 Days (60 x 60 x 24)

    let token = jwt.sign({
        id,
        email,
        access_token,
        username,
        isAdmin: role ==='user' ? false : true
    }, auth.jwt.secret, {
            expiresIn,
            algorithm: 'HS256'
        })

    return token;
}

export default {
    verifyJWTToken,
    createJWToken
}
