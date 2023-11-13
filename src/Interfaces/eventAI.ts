export interface feverContentType {
  person_name: string;
  temperature: string;
  url: string;
}

export interface HistoryType {
  eventType: string;
  occuredDate: string;
  occuredTime: string;
  target?: string;
  checked: boolean;
  transactionId: string;
  eventId: string;
  feverContent?: feverContentType;
}
