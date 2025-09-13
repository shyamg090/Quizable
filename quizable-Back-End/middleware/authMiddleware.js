import bcrypt from 'bcrypt';

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // If there's no token, return Unauthorized

    bcrypt.compare(process.env.FRONT_END_PRIVATE_KEY, token, (err, result) => {
        if (err || !result) {
            return res.sendStatus(403); // If token is invalid, return Forbidden
        }
        next(); // Token is valid, proceed to the next middleware/route handler
    });
}

export default auth;