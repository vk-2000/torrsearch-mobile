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
import {selectSearch, setSearch} from '../../features/search/searchSlice';

const Tab = createMaterialTopTabNavigator();

function Home({navigation, route}) {
  // const [search, setSearch] = React.useState('');
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const sites = useSelector(selectSites);
  const sitesStatus = useSelector(state => state.sites.status);
  const dispatch = useDispatch();

  const search = useSelector(selectSearch);

  React.useEffect(() => {
    if (sitesStatus === 'idle') {
      dispatch(getSites());
    }
  }, [sitesStatus, dispatch]);

  const handleSearch = text => {
    console.log(text);
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
          {sites.length === 0 ? (
            <Tab.Screen name="Select atleast 1 site" children={() => <></>} />
          ) : (
            sites
              .filter(site => site.enabled)
              .map(site => {
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
