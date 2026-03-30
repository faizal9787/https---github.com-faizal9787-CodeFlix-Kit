/**
 * Restricts access to specific roles.
 * Usage: requireRole(['superadmin', 'manager'])
 */
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        // validateUser must run BEFORE this middleware
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access Denied: Required role not found (${allowedRoles.join(', ')})`
            });
        }
        next();
    };
};
//# sourceMappingURL=requireRole.js.map