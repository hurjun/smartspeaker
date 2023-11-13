import { ApiKeyInstance } from '../Utils/Fetch';

export const PointAPI = {
  getPointId: ({ map_id }: { map_id: string }) =>
    ApiKeyInstance.get(`/point/${map_id}`),
  getPatientId: ({
    map_id,
    waypoint_id,
  }: {
    map_id: string;
    waypoint_id: string;
  }) => ApiKeyInstance.get(`/point/${map_id}?id=${waypoint_id}`),
};
