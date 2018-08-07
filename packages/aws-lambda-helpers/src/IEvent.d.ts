import { IEventHeader } from './IEventHeader';

export interface IEvent<TData = any> {
  header: IEventHeader;
  data?: TData;
}
