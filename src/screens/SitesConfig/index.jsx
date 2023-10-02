import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import getStyles from './SItesConfig.styles';
import {faGrip} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {generateColor} from '../../utils/common';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectSites,
  getSites,
  reorderSites,
  toggleSite,
} from '../../features/sites/sitesSlice';

const SitesConfig = ({navigation}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const sitesStatus = useSelector(state => state.sites.status);
  const dispatch = useDispatch();
  const sites = useSelector(selectSites);

  React.useEffect(() => {
    if (sitesStatus === 'idle') {
      dispatch(getSites());
    }
  }, [sitesStatus, dispatch]);

  const handleSwitchChange = key => {
    dispatch(toggleSite(key));
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
                value={item.enabled}
                onValueChange={value => {
                  handleSwitchChange(item.key);
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
    dispatch(reorderSites(data));
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
