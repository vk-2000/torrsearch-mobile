import React from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TorrentList from '../../components/TorrentList';
import {useTheme} from '@react-navigation/native';
import getStyles from './Home.styles';
import {faSliders} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector, useDispatch} from 'react-redux';
import {selectSites, getSites} from '../../features/sites/sitesSlice';
import {setSearch} from '../../features/search/searchSlice';

const Tab = createMaterialTopTabNavigator();

function Home({navigation}) {
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const sites = useSelector(selectSites);
  const torrents = useSelector(state => state.sites.torrents);
  const sitesStatus = useSelector(state => state.sites.status);
  const dispatch = useDispatch();

  const [selectedSites, setSelectedSites] = React.useState([]);

  React.useEffect(() => {
    setSelectedSites(
      sites &&
        sites.filter(
          site =>
            site.enabled &&
            (torrents[site.key].status === 'fulfilled' ||
              torrents[site.key].status === 'idle'),
        ),
    );
  }, [sites, torrents]);

  React.useEffect(() => {
    if (sitesStatus === 'idle') {
      dispatch(getSites());
    }
  }, [sitesStatus, dispatch]);

  const handleSearch = text => {
    dispatch(setSearch(text.trim()));
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor={colors.text2}
          onSubmitEditing={e => handleSearch(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SitesConfig')}>
          <View style={styles.settingsButton}>
            <FontAwesomeIcon icon={faSliders} size={20} color={colors.text2} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
          }}>
          {selectedSites.length === 0 ? (
            <Tab.Screen name="Loading..." children={() => <></>} />
          ) : (
            selectedSites.map(site => {
              return (
                <Tab.Screen
                  name={site.name}
                  component={TorrentList}
                  initialParams={{site: site.name}}
                  key={site.key}
                />
              );
            })
          )}
        </Tab.Navigator>
      </View>
    </View>
  );
}

export default Home;
