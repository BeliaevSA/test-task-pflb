import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';
import dataFetchReducer from './dataFetchSlice';
import { api } from './api/api';

export default configureStore({
  reducer: {
    basket: basketReducer,
    dataFetch: dataFetchReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});
