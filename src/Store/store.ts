import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';

import LoginSlice from './LoginSlice';
import DataSlice from './DataSlice';
import OpenSlice from './OpenSlice';
import RobotInfoSlice from './RobotInfoSlice';

const persistsConfig = {
  key: 'root',
  storage: sessionStorage,
  blacklist: ['openStore'],
};
const reducers = combineReducers({
  loginStore: LoginSlice,
  dataStore: DataSlice,
  openStore: OpenSlice,
  robotInfoStore : RobotInfoSlice
});

const persistedReduscer = persistReducer(persistsConfig, reducers);

export default configureStore({
  reducer: persistedReduscer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
