import {configureStore} from '@reduxjs/toolkit';
import sitesReducer from './features/sites/sitesSlice';
import searchReducer from './features/search/searchSlice';

export default configureStore({
  reducer: {
    sites: sitesReducer,
    search: searchReducer,
  },
});
