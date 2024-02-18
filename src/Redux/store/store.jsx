import { configureStore } from '@reduxjs/toolkit';

import composeReducer from '../Slice/composeReducer';
import userReducer from '../Slice/userReducer';

// Configure your Redux store
const store = configureStore({
  reducer: {
    compose: composeReducer,
    user: userReducer,
  },
});

export default store;
