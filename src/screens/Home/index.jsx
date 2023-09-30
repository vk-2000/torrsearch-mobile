import React from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import torrsearch from 'torrsearch';
import TorrentList from '../../components/TorrentList';
import {useTheme} from '@react-navigation/native';
import getStyles from './Home.styles';
import {faSliders} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

const defaultSites = torrsearch.listSites().map(site => {
  return {name: site, key: site, isSelected: true};
});

function Home({navigation, route}) {
  const [search, setSearch] = React.useState('');
  const [sites, setSites] = React.useState([]);
  const {colors} = useTheme();
  const styles = getStyles(colors);

  React.useEffect(() => {
    if (route.params?.settingsUpdated) {
      setSites(route.params?.updatedSites.filter(site => site.isSelected));
    }
  }, [route.params?.settingsUpdated, route.params?.updatedSites]);

  React.useEffect(() => {
    AsyncStorage.getItem('sites')
      .then(value => {
        if (value !== null) {
          const filteredSites = JSON.parse(value).filter(
            site => site.isSelected,
          );
          setSites(filteredSites);
        } else {
          setSites(defaultSites);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleSearch = text => {
    setSearch(text.trim());
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
          {sites.length === 0 ? (
            <Tab.Screen name="Select atleast 1 site" children={() => <></>} />
          ) : (
            sites.map(site => {
              return (
                <Tab.Screen
                  name={site.name}
                  children={() => (
                    <TorrentList site={site.name} query={search} />
                  )}
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
