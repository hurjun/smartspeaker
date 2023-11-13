import { Instance } from '../../Utils/Fetch';

export const mqttCommand = {
  Stop: (robot_uuid: string | undefined) =>
    Instance.post(`mqtt/command/control`, {
      robot_uuid: robot_uuid,
      type: 'CONTROL_STOP',
      body: {},
    }),
  Home: (robot_uuid: string | undefined) =>
    Instance.post(`mqtt/command/control`, {
      robot_uuid: robot_uuid,
      type: 'CONTROL_HOME',
      body: {},
    }),
  PauseY: (robot_uuid: string | undefined) =>
    Instance.post(`mqtt/command/control`, {
      robot_uuid: robot_uuid,
      type: 'CONTROL_PAUSE',
      body: {
        toggleFlag: 'Y',
      },
    }),
  PauseX: (robot_uuid: string | undefined) =>
    Instance.post(`mqtt/command/control`, {
      robot_uuid: robot_uuid,
      type: 'CONTROL_PAUSE',
      body: {
        toggleFlag: 'X',
      },
    }),
};
