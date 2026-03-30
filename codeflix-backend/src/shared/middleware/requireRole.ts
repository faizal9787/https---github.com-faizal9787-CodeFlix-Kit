import { Request, Response, NextFunction } from 'express';

/**
 * Restricts access to specific roles.
 * Usage: requireRole(['superadmin', 'manager'])
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

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