import {StyleSheet} from 'react-native';

const getStyles = colors => {
  return StyleSheet.create({
    container: {
      //   flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      paddingBottom: 5,
    },
    list: {
      width: '100%',
    },
    text: {
      color: colors.text,
    },
  });
};

export default getStyles;
