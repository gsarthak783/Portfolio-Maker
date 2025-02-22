import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slices/userDataSlice';

export const reduxStore = configureStore({
    reducer:{
        userData: loginReducer
    }
});