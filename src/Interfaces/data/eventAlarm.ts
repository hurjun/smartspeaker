export interface EventAIObjectType {
  robot_id: string;
  transaction_id: string;
  id: string;
  type: string;
  timestamp: string;
  location: {
    y: string;
    x: string;
    degree: string;
  };
  content: {
    face_id: string;
    person_name: string;
    temperature: string;
    track_id: string;
  };
  check: boolean;
  url: string;
}
