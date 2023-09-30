import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTheme} from '@react-navigation/native';
import getStyles from './HeaderBack.styles';

const HeaderBack = ({onBackPress}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <View>
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.backButtonContainer}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} color={colors.text2} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBack;
