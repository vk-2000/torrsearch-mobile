import React from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import torrsearch from 'torrsearch';
import TorrentCard from '../TorrentCard';
import getStyles from './TorrentList.styles';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import LabelBadge from '../LabelBadge';
import {selectSearch} from '../../features/search/searchSlice';
import {useSelector} from 'react-redux';

const TORRENT_LIMIT = 15;

const TorrentList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {site} = route.params;
  const [torrents, setTorrents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const query = useSelector(selectSearch);

  React.useEffect(() => {
    if (query === '') {
      setTorrents([]);
      return;
    }
    setLoading(true);
    (async () => {
      try {
        const res = await torrsearch.search(query, TORRENT_LIMIT, site);
        setLoading(false);
        setTorrents(res);
      } catch (e) {
        setLoading(false);
        // console.log(e);
      }
    })();
    // torrsearch
    //   .search(query, TORRENT_LIMIT, site)
    //   .then(res => {
    //     setLoading(false);
    //     setTorrents(res);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  }, [site, query]);

  React.useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarBadge: () => {
        if (torrents.length === 0) {
          return null;
        }
        return <LabelBadge color={colors.primary} dimension={5} margin={5} />;
      },
    });
  }, [navigation, torrents, colors.primary]);

  if (query === '') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Search for something</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={torrents}
        renderItem={({item}) => <TorrentCard {...{...item, query}} />}
        keyExtractor={item => item.index}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => {
          return (
            <View style={styles.container}>
              <Text style={styles.text}>No results found</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default React.memo(TorrentList);
