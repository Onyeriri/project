import jwt from 'jsonwebtoken';
import 'dotenv/config';
import ErrorHandler from '../ErrorHandler/errorhandler';

class JWT {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    }

    static authenticate(req, res, next) {
        try {
            if (!req.headers.authorization) {
                throw new ErrorHandler('Invalid header authorization', 404);
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
                if (err) {
                    throw new ErrorHandler('No token is provided', 401);
                }
                req.auth = res;
                next();
            })
        } catch (error) {
            next(error)
        }

    }
}
export default JWT;