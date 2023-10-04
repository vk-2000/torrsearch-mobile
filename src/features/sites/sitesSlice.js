import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import torrsearch from 'torrsearch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  sites: [],
  status: 'idle',
  error: null,
  torrents: {},
};

export const getSites = createAsyncThunk('sites/getSites', async () => {
  let sites = [];
  const sitesFromStorage = await AsyncStorage.getItem('sites');
  if (sitesFromStorage) {
    sites = JSON.parse(sitesFromStorage);
  } else {
    sites = torrsearch.listSites().map(site => ({
      name: site,
      key: site,
      enabled: true,
    }));
    await AsyncStorage.setItem('sites', JSON.stringify(sites));
  }
  const siteKeys = sites.map(site => site.key);
  const torrents = {};
  siteKeys.forEach(site => {
    torrents[site] = {
      status: 'idle',
      scrollStatus: 'idle',
      moreAvailable: true,
      torrents: [],
      torrentsQuery: '',
      error: null,
      offset: 0,
      limit: 10,
    };
  });
  return {
    sites,
    torrents,
  };
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

// export const getTorrents = createAsyncThunk(
//   'sites/getSiteTorrents',
//   async (query, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const torrents = state.sites.torrents;
//     const sites = state.sites.sites;
//     sites
//       .filter(site => site.enabled)
//       .map(async site => {
//         const newTorrents = {...torrents[site.key], status: 'loading'};
//         thunkAPI.dispatch(
//           updateTorrents({site: site.key, torrents: newTorrents}),
//         );
//         try {
//           const newTorrentsList = await torrsearch.search(
//             query,
//             torrents[site.key].offset,
//             torrents[site.key].limit,
//             site.name,
//           );
//           thunkAPI.dispatch(
//             updateTorrents({
//               site: site.key,
//               torrents: {
//                 ...newTorrents,
//                 status: 'fulfilled',
//                 torrents: newTorrentsList,
//                 offset: newTorrents.offset + newTorrents.limit,
//               },
//             }),
//           );
//         } catch (e) {
//           thunkAPI.dispatch(
//             updateTorrents({
//               site: site.key,
//               torrents: {
//                 ...newTorrents,
//                 status: 'error',
//                 moreAvailable: false,
//               },
//             }),
//           );
//         }
//       });
//   },
// );

export const getTorrents = createAsyncThunk(
  'sites/getMoreSiteTorrents',
  async (siteInfo, thunkAPI) => {
    const {site, query} = siteInfo;

    const state = thunkAPI.getState();
    const torrents = state.sites.torrents[site];
    if (torrents.status === 'loading') {
      return;
    }
    const newTorrents = {...torrents, status: 'loading', torrentsQuery: query};
    thunkAPI.dispatch(updateTorrents({site, torrents: newTorrents}));
    // console.log(`getting torrents from ${site} for query ${query}`);
    try {
      const newTorrentsList = await torrsearch.search(
        query,
        torrents.offset,
        torrents.limit,
        site,
      );
      thunkAPI.dispatch(
        updateTorrents({
          site,
          torrents: {
            ...torrents,
            torrents: newTorrentsList,
            offset: torrents.offset + torrents.limit,
            status: 'fulfilled',
            torrentsQuery: query,
            moreAvailable: newTorrentsList.length === 0 ? false : true,
          },
        }),
      );
    } catch (e) {
      thunkAPI.dispatch(
        updateTorrents({
          site,
          torrents: {
            ...torrents,
            status: 'error',
            moreAvailable: false,
          },
        }),
      );
    }
  },
);

export const getMoreTorrents = createAsyncThunk(
  'sites/getMoreSiteTorrents',
  async (siteInfo, thunkAPI) => {
    const {site, query} = siteInfo;

    const state = thunkAPI.getState();
    const torrents = state.sites.torrents[site];
    if (torrents.status === 'loading' || !torrents.moreAvailable) {
      return;
    }
    const newTorrents = {...torrents, scrollStatus: 'loading'};
    thunkAPI.dispatch(updateTorrents({site, torrents: newTorrents}));
    // console.log(`getting more torrents from ${site} for query ${query}`);
    try {
      const newTorrentsList = await torrsearch.search(
        query,
        torrents.offset,
        torrents.limit,
        site,
      );
      thunkAPI.dispatch(
        updateTorrents({
          site,
          torrents: {
            ...torrents,
            torrents: [...torrents.torrents, ...newTorrentsList],
            offset: torrents.offset + torrents.limit,
            scrollStatus: 'idle',
            moreAvailable: newTorrentsList.length === 0 ? false : true,
          },
        }),
      );
    } catch (e) {
      thunkAPI.dispatch(
        updateTorrents({
          site,
          torrents: {
            ...torrents,
            scrollStatus: 'error',
            moreAvailable: false,
          },
        }),
      );
    }
  },
);

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    updateTorrents(state, action) {
      state.torrents[action.payload.site] = action.payload.torrents;
    },
  },
  extraReducers(builder) {
    builder.addCase(getSites.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getSites.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.sites = action.payload.sites;
      state.torrents = action.payload.torrents;
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

export const {updateTorrents} = sitesSlice.actions;
export default sitesSlice.reducer;
export const selectSites = state => state.sites.sites;
