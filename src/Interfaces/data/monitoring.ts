export interface IMonitoringData {
  transactionId: string;
  robotId: string;
  ip: string;
  macAddress: string;
  floorId: string;
  mapId: string;
  currentJob: string;
  currentMap: string;
  jobExeTime: string;
  slamStatus: string;
  slamMap: string;
  slamSite: string;
  localizationStatus: string;
  localizationRawData: string;
  emergencyStatus: string;
  moveStatus: string;
  robotStatus: string;
  robotState: string;
  serviceMode: string;
  batteryStatus: string;
  batteryStatusVoltage: string;
  schedulingID: string;
  schedulingGoalNo: string;
  positionType: string;
  positionStatus: string;
  moveToPositionName: string;
  movingDistance: string;
  movingEstTime: string;
  movingTimeout: string;
  aebStatus: string;
  robotHealthStatus: string;
  odomPosition: {
    x: string;
    y: string;
    degree: string;
  };
  position: {
    x: number;
    y: number;
    degree: string;
  };
  speed: number;
  statistics: {
    cumulativeTravelDistance: number;
    cumulativeTravelTime: number;
    cumulativeUpTime: number;
  };
  moduleStatus: [
    {
      key: string;
      value: string;
      category: string;
    }
  ];
  createdAt: string;
}
