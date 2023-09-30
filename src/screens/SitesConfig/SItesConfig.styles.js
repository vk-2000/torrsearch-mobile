import {StyleSheet} from 'react-native';

const getStyles = colors => {
  return StyleSheet.create({
    siteWrapper: {
      width: '100%',
    },
    siteContainer: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      marginHorizontal: 10,
      marginTop: 10,
      paddingHorizontal: 5,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      height: 40,
      width: 40,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      marginRight: 10,
      fontSize: 20,
      fontWeight: 'bold',
    },
    siteText: {
      color: colors.text,
      marginLeft: 10,
      fontSize: 16,
    },
    controlsContianer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    controls: {
      marginHorizontal: 5,
    },
  });
};

export default getStyles;
