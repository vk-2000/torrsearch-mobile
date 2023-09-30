import Home from '../screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SitesConfig from '../screens/SitesConfig';

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SitesConfig"
        component={SitesConfig}
        options={{
          title: 'Sites',
        }}
      />
    </Stack.Navigator>
  );
}
