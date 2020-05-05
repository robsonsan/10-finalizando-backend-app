import 'reflect-metadata';
import { startOfHour, parseISO } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public static convertDate(date: string): Date {
    return startOfHour(parseISO(date));
  }

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const findAppointment = await this.appointmentsRepository.findByDate(date);

    if (findAppointment) {
      throw new AppError('This appointment is already booked!', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
