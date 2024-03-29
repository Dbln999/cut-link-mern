import {combineReducers, configureStore} from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";

const rootReducer = combineReducers({
    token:tokenSlice
})

export const store = configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;