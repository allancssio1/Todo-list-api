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
}
