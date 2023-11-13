export interface ITeamRobot {
  data: [
    {
      id: string;
      created_at: string;
      team_id: number;
      type: string;
      nickname: string;
      description: string;
      uuid: string;
      alive: boolean;
      serial_number: null;
      supplied: string;
      location: string;
      map_id: string;
    }
  ];
}
export interface IRobotInfo {
  id: string;
  created_at: string;
  team_id: number;
  type: string;
  nickname: string;
  description: string;
  uuid: string;
  alive: boolean;
  serial_number: null;
  supplied: string;
  location: string;
  map_id: string;
}
