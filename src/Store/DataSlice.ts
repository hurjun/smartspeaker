import { createSlice } from '@reduxjs/toolkit';

import { IMonitoringData } from '../Interfaces/data/monitoring';
import { ISensorData } from '../Interfaces/data/sensor';

export const MonitDataSlice = createSlice({
  name: 'MonitDataSlice',
  initialState: {
    MonitData: {} as IMonitoringData,
    SensorData: {} as ISensorData,
  },
  reducers: {
    setMonitData: (state, params) => {
      state.MonitData = { ...params.payload };
    },
    setSensorData: (state, params) => {
      state.SensorData = { ...params.payload };
    },
  },
});

export const { setMonitData, setSensorData } = MonitDataSlice.actions;
export default MonitDataSlice.reducer;
