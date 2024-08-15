import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './langeageSlice';
import historyReducer from './historySlice';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        history: historyReducer
    },
})