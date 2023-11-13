import { ApiKeyInstance, Instance } from '../Utils/Fetch';

export const UserAuthAPI = {
  userLogin: (parmas: { [username: string]: string; password: string }) => {
    let formBody: string[] | string = [];

    for (const property in parmas) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(parmas[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    return ApiKeyInstance.post('auth/login', formBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  getTeamRobot: () => ApiKeyInstance.get('robot'),
};
