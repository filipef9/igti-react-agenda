export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

const { REACT_APP_API_HOST } = process.env;

export const getCalendarsEndPoint = (): Promise<ICalendar[]> => {
  return fetch(`${REACT_APP_API_HOST}/calendars`)
    .then(res => res.json) as Promise<ICalendar[]>;
};

export const getEventsEndpoint = (): Promise<IEvent[]> => {
  return fetch(`${REACT_APP_API_HOST}/events`)
    .then(res => res.json());
}