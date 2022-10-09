import { Request, Response } from 'express';
import { UserModule } from '../models/Users';

class UserController {
  async create(req: Request, res: Response) {
    const { name, username, password, email } = req.body;

    const userId = await UserModule.create(name, username, password, email);
    return res.status(200).json({ userId });
  }
}

export { UserController };
