import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import torrsearch from 'torrsearch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  sites: [],
  status: 'idle',
  error: null,
};

export const getSites = createAsyncThunk('sites/getSites', async () => {
  const sites = await AsyncStorage.getItem('sites');
  if (sites) {
    return JSON.parse(sites);
  }
  return torrsearch.listSites().map(site => ({
    name: site,
    key: site,
    enabled: true,
  }));
});

export const toggleSite = createAsyncThunk(
  'sites/toggleSite',
  async (key, thunkAPI) => {
    const sites = thunkAPI.getState().sites.sites;
    const newSites = sites.map(s => {
      if (s.key === key) {
        return {...s, enabled: !s.enabled};
      }
      return s;
    });
    await AsyncStorage.setItem('sites', JSON.stringify(newSites));
    return newSites;
  },
);

export const reorderSites = createAsyncThunk(
  'sites/reorderSites',
  async sites => {
    await AsyncStorage.setItem('sites', JSON.stringify(sites));
    return sites;
  },
);

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSites.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getSites.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.sites = action.payload;
    });
    builder.addCase(getSites.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    });

    // builder.addCase(toggleSite.pending, state => {
    //   state.status = 'loading';
    // });
    builder.addCase(toggleSite.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.sites = action.payload;
    });
    // builder.addCase(toggleSite.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.error.message;
    // });

    // builder.addCase(reorderSites.pending, state => {
    //   state.status = 'loading';
    // });
    builder.addCase(reorderSites.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.sites = action.payload;
    });
    // builder.addCase(reorderSites.rejected, (state, action) => {
    //   state.status = 'idle';
    //   state.error = action.error.message;
    // });
  },
});

export default sitesSlice.reducer;
export const selectSites = state => state.sites.sites;
