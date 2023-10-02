import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import store from './store';
import {Provider} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <RootNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
