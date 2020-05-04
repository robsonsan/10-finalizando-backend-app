import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = CreateAppointmentService.convertDate(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    return response.json(
      await createAppointmentService.execute({ provider_id, date: parsedDate }),
    );
  }
}
