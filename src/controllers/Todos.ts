import { Request, Response } from 'express';
import { TodosModels } from '../models/Todos';
import { UserModule } from '../models/Users';
export class TodosController {
  async list(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UserModule.findUserById(id);

    if (!user)
      return res.status(400).json({
        success: false,
        message: 'User not found!',
        data: {},
      });

    const todos = await TodosModels.listAllTodosToClientId(id);

    if (!todos)
      return res.status(404).json({
        success: false,
        message: 'Todos not found!',
        data: {},
      });

    return res.status(200).json({
      success: true,
      message: 'Todos finded success!',
      data: { todos },
    });
  }

  async create(req: Request, res: Response) {
    const { title, description } = req.body;
    let { priority, state } = req.body;
    const { id } = req.params;

    const user = await UserModule.findUserById(id);

    if (priority !== 'medium' && priority !== 'high') priority = 'low';
    if (state !== 'inited' && state !== 'conclued') state = 'not init';

    if (!user)
      return res.status(400).json({
        success: false,
        message: 'User not found!',
        data: {},
      });

    const todo = await TodosModels.newTodo(
      title,
      description,
      priority,
      state,
      id,
    );

    return res.status(400).json({
      success: true,
      message: 'Todo create success!',
      data: { id: todo.id },
    });
  }

  async edit(req: Request, res: Response) {
    const { title, description } = req.body;
    let { priority, state } = req.body;
    const { todoId } = req.params;

    const todo = await TodosModels.findTodoById(todoId);

    if (!todo)
      return res.status(400).json({
        success: false,
        message: 'User not found!',
        data: {},
      });

    if (priority !== 'medium' && priority !== 'high') priority = 'low';
    if (state !== 'inited' && state !== 'conclued') state = 'not init';

    const todoUpdated = await TodosModels.update(
      title,
      description,
      priority,
      state,
      todoId,
    );

    return res.status(400).json({
      success: true,
      message: 'Todo edited success!',
      data: { id: todoUpdated.id },
    });
  }

  async delete(req: Request, res: Response) {
    const { todoId: id } = req.params;

    const todo = await TodosModels.findTodoById(id);

    if (!todo)
      return res.status(400).json({
        success: false,
        message: 'Todo not found',
        data: {},
      });

    await TodosModels.deleteTodo(id);

    return res.status(200).json({
      success: true,
      message: 'Todo deleted success!',
      data: {},
    });
  }
}
