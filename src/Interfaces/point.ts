export interface IPoint {
  map_id: string;
  id: string;
  type: string;
  name: string;
  attribute: {
    patient_name?: string[];
  };
  pose_x: number;
  pose_y: number;
  pose_theta: number;
}
