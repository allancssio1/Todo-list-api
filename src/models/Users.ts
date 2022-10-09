import { prisma } from '../database/prisma';

export const UserModule = {
  create: async (
    name: string,
    username: string,
    password: string,
    email: string,
  ) => {},
};
