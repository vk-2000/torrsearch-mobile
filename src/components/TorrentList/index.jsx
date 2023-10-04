import React from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import TorrentCard from '../TorrentCard';
import getStyles from './TorrentList.styles';
import {useRoute, useTheme} from '@react-navigation/native';
import {selectSearch} from '../../features/search/searchSlice';
import {useSelector, useDispatch} from 'react-redux';
import {getMoreTorrents, getTorrents} from '../../features/sites/sitesSlice';

const TorrentList = () => {
  const route = useRoute();
  const {site} = route.params;
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const query = useSelector(selectSearch);
  const torrentSite = useSelector(state => state.sites.torrents[site]);
  const scrollStatus = useSelector(
    state => state.sites.torrents[site].scrollStatus,
  );
  const moreAvailable = useSelector(
    state => state.sites.torrents[site].moreAvailable,
  );
  const dispatch = useDispatch();

  const renderFooter = () => {
    if (scrollStatus === 'loading') {
      return (
        <View>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    } else {
      return null;
    }
  };

  const handleOnEndReached = () => {
    if (moreAvailable) {
      dispatch(getMoreTorrents({site, query}));
    }
  };

  React.useEffect(() => {
    if (query === '') {
      return;
    }
    if (torrentSite.status === 'idle' || torrentSite.torrentsQuery !== query) {
      dispatch(getTorrents({site, query}));
    }
  }, [site, query, dispatch, torrentSite.status, torrentSite.torrentsQuery]);

  if (query === '') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Search for something</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={torrentSite.torrents}
        renderItem={({item}) => <TorrentCard {...{...item, query}} />}
        keyExtractor={item => item.magnetLink}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => {
          return (
            <View style={styles.container}>
              <Text style={styles.text}>No results found</Text>
            </View>
          );
        }}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default React.memo(TorrentList);
