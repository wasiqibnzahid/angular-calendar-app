export interface IAppointment {
  name: string;
  date: string | Date;
  time: string;
}

export interface payloadWithIndex extends IAppointment {
  index?: number;
}
