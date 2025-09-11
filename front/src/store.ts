import { configureStore } from '@reduxjs/toolkit';
// importo slice-et që do përdorësh, p.sh. userSlice
// import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    // user: userReducer,
  },
});

// Llojet për TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
