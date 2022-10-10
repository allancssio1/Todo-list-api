import { prisma } from '../database/prisma';
import { hash } from 'bcryptjs';

export const UserModule = {
  create: async (
    name: string,
    username: string,
    password: string,
    email: string,
  ) => {
    return await prisma.users.create({
      data: {
        name,
        username,
        password: await hash(password, 8),
        email,
      },
    });
  },
};
