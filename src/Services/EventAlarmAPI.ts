import { ApiKeyInstance } from '../Utils/Fetch';
import { EventAIObjectType } from '../Interfaces/data/eventAlarm';

export const EventAlarmAPI = {
  getEventAI: async (
    uuid: string,
    fromTime: string,
    toTime: string,
    type?: string
  ) => {
    const { data } = await ApiKeyInstance.get<EventAIObjectType[]>(
      '/event/history',
      {
        headers: { 'robot-uuid': uuid },
        params: {
          time_from: fromTime,
          time_to: toTime,
          type: type,
        },
      }
    );

    return data;
  },
  getImage: async (uuid: string, eventId: string, label: string) => {
    const { data } = await ApiKeyInstance.get(
      `/event/image/${eventId}/${label}`,
      {
        headers: { 'robot-uuid': uuid },
      }
    );

    return data;
  },
  putEventAI: ({
    uuid,
    transactionId,
  }: {
    uuid: string;
    transactionId: string;
  }) => {
    console.log('apiapiapiapaiapiapia', uuid, transactionId);
    return ApiKeyInstance.patch(
      `/event/${transactionId}`,
      {},
      {
        headers: {
          'robot-uuid': uuid,
        },
      }
    );
  },
};
