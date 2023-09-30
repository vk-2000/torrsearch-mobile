import {StyleSheet} from 'react-native';

const getStyles = colors => {
  return StyleSheet.create({
    container: {
      margin: 5,
      backgroundColor: colors.card,
      borderRadius: 5,
      padding: 5,
    },
    text1: {
      color: colors.text,
    },
    text2: {
      color: colors.text2,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInfoContainer: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: 10,
    },
    sizeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    peerInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    peer: {
      marginRight: 10,
    },
    linkContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
    },
    button: {
      height: 35,
      width: 35,
      marginHorizontal: 5,
      marginVertical: 10,
      borderRadius: 35 / 2,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      color: 'black',
    },
    icon: {
      marginRight: 5,
    },
  });
};

export default getStyles;
