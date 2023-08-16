import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { listApi } from './api';
import authslice from './slice/authslice';
import wishlistslice from './slice/wishlistslice';

export const makeStore = (): any => {
  return configureStore({
    reducer: {
      auth: authslice,
      wishlist: wishlistslice,
      [listApi.reducerPath]: listApi.reducer,
    },
    middleware: (gDM) => gDM().concat(listApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
