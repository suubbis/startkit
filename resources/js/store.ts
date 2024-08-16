import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './Reducer';

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;