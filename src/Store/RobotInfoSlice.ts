import { createSlice } from '@reduxjs/toolkit';

import { IRobotInfo } from '../Interfaces/auth/robot';

export const RobotInfoDataSlice = createSlice({
  name: 'RobotInfoDataSlice',
  initialState: {
    RobotInfoData: {} as IRobotInfo,
  },
  reducers: {
    setRobotInfoData: (state, params) => {
      state.RobotInfoData = { ...params.payload };
    },
  },
});

export const { setRobotInfoData } = RobotInfoDataSlice.actions;
export default RobotInfoDataSlice.reducer;
