export interface ISensorData {
  transactionId: string;
  robotId: string;
  gas: {
    SO2: number;
    VOC: number;
    NO2: number;
  };
  dust: {
    'PM2.5': number;
    PM10: number;
    'PM1.0': number;
  };
}
