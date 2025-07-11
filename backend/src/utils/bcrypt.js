import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const saltRounds = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
