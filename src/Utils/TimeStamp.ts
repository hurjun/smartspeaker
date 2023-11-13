export const ISOTimestamp = () => {
  const date = new Date();

  const ISOPresentTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  ).toISOString();

  return {
    ISOPresentTime,
  };
};

export const ISOtimeFromTostamp = (params = 1) => {
  const date = new Date();

  const ISOPresentTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  ).toISOString();

  const ISOPastTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000 - 600000,
  ).toISOString();

  return {
    timeFrom: ISOPastTime,
    timeTo: ISOPresentTime,
  };
};

export const compareISOTimestamp = (monitDataCreatedAt: string) => {
  const date = new Date();

  const paramsDate = new Date(monitDataCreatedAt);

  const ISOPresentTime = new Date(date.getTime());

  const compareTime = ISOPresentTime.getTime() - paramsDate.getTime();

  if (compareTime >= 180000) {
    return false;
  } else {
    return true;
  }
};
