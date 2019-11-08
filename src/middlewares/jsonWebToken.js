import jwt from 'jsonwebtoken';
import 'dotenv/config';

class JWT {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET);
    }
}
export default JWT;