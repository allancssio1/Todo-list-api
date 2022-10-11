import { prisma } from '../database/prisma';

export const TodosModels = {
  listAllTodosToClientId: async (userId: string) => {
    await prisma.todos.findMany({
      where: {
        usersId: userId,
      },
    });
  },
};
