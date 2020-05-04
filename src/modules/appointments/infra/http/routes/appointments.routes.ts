/* eslint-disable @typescript-eslint/camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   return response.json(await appointmentsRepository.find());
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
