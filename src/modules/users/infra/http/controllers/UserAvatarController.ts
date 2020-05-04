import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);
      const user = await updateUserAvatar.execute({
        userId: request.user.id,
        avatarFilename: request.file.filename,
      });
      delete user.password;
      return response.json(user);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }

    return response.json({ ok: request.file.filename });
  }
}
