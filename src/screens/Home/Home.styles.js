import {StyleSheet} from 'react-native';

const getStyles = colors => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    searchContainer: {
      height: 50,
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchBar: {
      flex: 1,
      margin: 5,
      marginTop: 10,
      height: 40,
      backgroundColor: colors.background,
      borderRadius: 5,
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.text,
    },

    settingsButton: {
      height: 35,
      width: 35,
      //   marginHorizontal: 5,
      borderRadius: 35 / 2,
      backgroundColor: colors.button,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContainer: {
      flex: 1,
    },
  });
};

export default getStyles;
