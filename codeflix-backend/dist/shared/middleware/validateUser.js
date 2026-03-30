import { verifyToken } from '../services/jwt.js';
/**
 * Ensures the user is logged in with a valid token.
 */
export const validateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Authentication failed: No token provided'
        });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: 'Authentication failed: Invalid or expired token'
        });
    }
    // Attach the decoded identity (IDs and Role) to the request object
    req.user = decoded;
    next();
};
//# sourceMappingURL=validateUser.js.map