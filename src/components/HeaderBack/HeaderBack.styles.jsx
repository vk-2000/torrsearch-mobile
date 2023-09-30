import {StyleSheet} from 'react-native';

const getStyles = colors => {
  return StyleSheet.create({
    backButtonContainer: {
      marginLeft: 10,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default getStyles;
