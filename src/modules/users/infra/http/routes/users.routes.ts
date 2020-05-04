import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarComtroller from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarComtroller = new UserAvatarComtroller();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarComtroller.update,
);
export default usersRouter;
