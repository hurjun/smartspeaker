import { ApiKeyInstance } from '../Utils/Fetch';
import { IMission } from '../Interfaces/data/mission';

export const MissionAPI = {
  postMission: ({
    map_id,
    point_id,
    contents,
    activate_at,
    attribute,
    uuid,
  }: IMission) =>
    ApiKeyInstance.post(
      '/mission',
      {
        map_id,
        point_id,
        contents,
        activate_at,
        attribute,
      },
      {
        headers: {
          'robot-uuid': !!uuid && uuid,
        },
      }
    ),
  getMissionHistory: ({ uuid }: { uuid: string }) =>
    ApiKeyInstance.get('/mission/history', {
      headers: {
        'robot-uuid': !!uuid && uuid,
      },
    }),
};
