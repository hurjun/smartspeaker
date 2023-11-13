import { createSlice } from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
  name: 'LoginSlice',
  initialState: {
    loginInfo: {
      token: '',
      id: '',
    },
  },
  reducers: {
    setLoginInfo: (state, params) => {
      state.loginInfo = { ...params.payload };
    },
  },
});

export const { setLoginInfo } = LoginSlice.actions;
export default LoginSlice.reducer;
