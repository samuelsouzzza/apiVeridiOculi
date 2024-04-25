import bcrypt from 'bcrypt';

export const hashPassword = (str: string) => bcrypt.hashSync(str, 10);
