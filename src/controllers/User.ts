import { Request, Response } from 'express';
import { UserModule } from '../models/Users';

class UserController {
  async create(req: Request, res: Response) {
    const { name, username, password, email } = req.body;

    const userAlreadyExists = await UserModule.findUserByUsername(username);

    if (userAlreadyExists)
      return res.status(201).json({
        success: false,
        data: {},
        message: 'User already existes',
      });

    const user = await UserModule.create(name, username, password, email);

    return res.status(200).json({
      success: true,
      data: { userId: user.id },
      message: 'User created success!',
    });
  }

  async update(req: Request, res: Response) {
    const { name, username, password, email } = req.body;
    const { id } = req.params;

    const user = await UserModule.findUserById(id);

    if (!user)
      return res.status(404).json({
        success: false,
        data: {},
        message: 'User not found!',
      });

    await UserModule.update(name, username, password, email, id);

    return res.status(200).json({
      success: true,
      data: {},
      message: 'User edited success!',
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UserModule.findUserById(id);

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not Found!',
        data: {},
      });

    await UserModule.delete(id);

    return res.status(200).json({
      success: true,
      message: 'User deleted success!',
      data: {},
    });
  }

  async list(req: Request, res: Response) {
    const users = await UserModule.getAllUsers();
    return res.status(200).json({
      success: true,
      data: { users },
      message: 'User created success!',
    });
  }
}

export { UserController };
