import { prisma } from '../database/prisma';

export const TodosModels = {
  listAllTodosToClientId: async (id: string) => {
    return await prisma.todos.findMany({
      where: {
        userId: id,
      },
    });
  },
  newTodo: async (
    title: string,
    description: string,
    priority: string,
    state: string,
    id: string,
  ) => {
    return await prisma.todos.create({
      data: {
        title,
        description,
        priority,
        state,
        userId: id,
      },
    });
  },
};
