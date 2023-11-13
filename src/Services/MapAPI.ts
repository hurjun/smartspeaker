import { ApiKeyInstance } from '../Utils/Fetch';

export const MapAPI = {
  getMapData: ({ map_id }: { map_id: string }) =>
    ApiKeyInstance.get(`/map?id=${map_id}`),
  getMapImg: ({ map_id }: { map_id: string }) =>
    ApiKeyInstance.get(`map/image/${map_id}`),
};
