import { prisma } from '../database/prisma';

export const TodosModels = {
  listAllTodosToClientId: async (id: string) => {
    return await prisma.todos.findMany({
      where: {
        userId: id,
      },
    });
  },
};
