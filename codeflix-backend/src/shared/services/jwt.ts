import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Signing a token (used in Login)
export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
};

// Verifying a token (used in validateUser middleware)
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};