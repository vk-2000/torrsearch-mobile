import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import torrsearch from 'torrsearch';
import getStyles from './SItesConfig.styles';
import {faGrip} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBack from '../../components/HeaderBack';
import {generateColor} from '../../utils/common';

const defaultSites = torrsearch.listSites().map(site => {
  return {name: site, key: site, isSelected: true};
});

const SitesConfig = ({navigation}) => {
  const [sites, setSites] = React.useState([]);
  const {colors} = useTheme();
  const styles = getStyles(colors);
  React.useEffect(() => {
    AsyncStorage.getItem('sites')
      .then(value => {
        if (value !== null) {
          setSites(JSON.parse(value));
        } else {
          setSites(defaultSites);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  React.useEffect(() => {
    AsyncStorage.setItem('sites', JSON.stringify(sites));
  }, [sites]);

  React.useEffect(() => {
    const onBackPress = () => {
      navigation.navigate('Home', {
        settingsUpdated: true,
        updatedSites: sites,
      });
    };
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => <HeaderBack onBackPress={onBackPress} />,
    });
  }, [navigation, sites]);

  const handleSwitchChange = (index, value) => {
    const selectedCount = sites.filter(site => site.isSelected).length;
    if (selectedCount === 1 && value === false) {
      return;
    }
    const newSites = [...sites];
    newSites[index].isSelected = value;
    setSites(newSites);
  };

  const renderItem = ({item, getIndex, drag}) => {
    return (
      <View style={styles.siteWrapper}>
        <TouchableOpacity onLongPress={drag}>
          <View style={styles.siteContainer}>
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.box,
                  {backgroundColor: generateColor(getIndex())},
                ]}>
                {item.name.charAt(0)}
              </Text>
              <Text style={styles.siteText}>{item.name}</Text>
            </View>
            <View style={styles.controlsContianer}>
              <Switch
                style={styles.controls}
                value={item.isSelected}
                onValueChange={value => {
                  handleSwitchChange(getIndex(), value);
                }}
              />
              <FontAwesomeIcon
                style={styles.controls}
                icon={faGrip}
                size={20}
                color={colors.text2}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onDragEnd = ({data}) => {
    setSites(data);
  };
  return (
    <View>
      <DraggableFlatList
        data={sites}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        onDragEnd={onDragEnd}
      />
    </View>
  );
};

export default SitesConfig;
