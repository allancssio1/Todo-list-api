import { prisma } from '../database/prisma';
import { hash } from 'bcryptjs';

export const UserModule = {
  findUserByUsername: async (username: string) => {
    return await prisma.users.findFirst({
      where: {
        username,
      },
    });
  },
  findUserById: async (id: string) => {
    return await prisma.users.findFirst({
      where: {
        id,
      },
    });
  },
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
  update: async (
    name: string,
    username: string,
    password: string,
    email: string,
    userId: string,
  ) => {
    return await prisma.users.update({
      data: {
        name,
        username,
        password: await hash(password, 8),
        email,
      },
      where: { id: userId },
    });
  },
  delete: async (id: string) => {
    return await prisma.users.delete({
      where: { id },
    });
  },
  getAllUsers: async () => {
    return await prisma.users.findMany();
  },
};
