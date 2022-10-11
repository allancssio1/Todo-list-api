import { Request, Response } from 'express';
import { UserModule } from '../models/Users';
export class TodosController {
  async list(req: Request, res: Response) {
    const { id: userId } = req.params;

    const user = await UserModule.findUserById(userId);

    if (!user)
      return res.status(400).json({
        success: false,
        message: 'User not found!',
        data: {},
      });

    return res.status(200).json({
      success: true,
      message: 'Todos finded success!',
      data: { userId },
    });
  }
}
