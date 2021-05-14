import { Router } from 'express';
import { MessagesControllers } from './controllers/messagesControllers';
import { SettingsControllers } from './controllers/settingsControllers';
import { UsersControllers } from './controllers/usersControllers';

const settingsControllers = new SettingsControllers();
const usersControllers = new UsersControllers();
const messagesControllers = new MessagesControllers();

const routes = Router();

routes.post("/settings", settingsControllers.create);

routes.post("/users", usersControllers.create);

routes.post("/messages", messagesControllers.create);
routes.get("/messages/:id", messagesControllers.showByUser);

export {routes}