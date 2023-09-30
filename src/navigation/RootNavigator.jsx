import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import {useColorScheme} from 'react-native';
import AppNavigator from './AppNavigator';

const MyTheme = {
  default: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      //   background: 'rgb(255, 255, 255)',
      text2: 'dimgrey',
      primary: 'darkorange',
    },
  },

  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      text2: 'darkgrey',
      primary: 'lightblue',
      //   background: 'rgb(0, 0, 0)',
    },
  },
};

const RootNavigator = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      theme={scheme === 'dark' ? MyTheme.dark : MyTheme.default}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
