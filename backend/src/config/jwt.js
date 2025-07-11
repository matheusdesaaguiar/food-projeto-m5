export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || '',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  issuer: 'food-rescue',
  audience: 'food-rescue-users'
};
