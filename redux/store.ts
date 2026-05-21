import { configureStore } from "@reduxjs/toolkit";
import noteSlice from './slice';

const store=configureStore({
    reducer:{
        notesReducer: noteSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;