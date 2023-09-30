import React from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import torrsearch from 'torrsearch';
import TorrentCard from '../TorrentCard';
import getStyles from './TorrentList.styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import LabelBadge from '../LabelBadge';

const TORRENT_LIMIT = 20;

const TorrentList = ({site, query}) => {
  const navigation = useNavigation();
  const [torrents, setTorrents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  const styles = getStyles(colors);
  React.useEffect(() => {
    if (query === '') {
      setTorrents([]);
      return;
    }
    setLoading(true);
    torrsearch
      .search(query, TORRENT_LIMIT, site)
      .then(res => {
        setLoading(false);
        setTorrents(res);
      })
      .catch(() => {
        setLoading(false);
      });
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

export default TorrentList;
