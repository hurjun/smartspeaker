import { ApiKeyInstance } from '../Utils/Fetch';

export const RawDataAPI = {
  monitData: (robot_uuid: string | undefined) =>
    ApiKeyInstance.get(`data/raw/recent/monitoring`, {
      headers: {
        'robot-uuid': !!robot_uuid && robot_uuid,
      },
    }),
  sensorData: (robot_uuid: string | undefined) =>
    ApiKeyInstance.get(`data/raw/recent/sensor`, {
      headers: {
        'robot-uuid': !!robot_uuid && robot_uuid,
      },
    }),
  getQuestionReply: ({
    robot_uuid,
    topic_type,
  }: {
    robot_uuid: string;
    topic_type: string;
  }) =>
    ApiKeyInstance.get(`data/raw/recent/${topic_type}?limit=10`, {
      headers: {
        'robot-uuid': !!robot_uuid && robot_uuid,
      },
    }),
};
