import { Router } from 'express';
import { TodosController } from '../controllers/Todos';
import { UserController } from '../controllers/User';

const userController = new UserController();
const todosController = new TodosController();

const routes = Router();

routes.post('/user/create', userController.create);
routes.put('/user/editUser/:id', userController.update);
routes.delete('/user/delete/:id', userController.delete);

routes.get('/todos/list/:id', todosController.list);
routes.post('/todos/create/:id', todosController.create);
routes.put('/todos/edit/:todoId', todosController.edit);

export { routes };
