import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './reducers/Contacts';

export const store= configureStore({
  reducer: {
      contacts:contactsSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch