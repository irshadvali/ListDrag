/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Home from './src/Home';
import HomeTwo from './src/HomeTwo';
import HomeThree from './src/HomeThree';
import DragDropModule from './src/DragDropModule';
import {LogBox} from 'react-native';
import DDNS from './src/newfile/screen/DDNS';
import DDND from './src/newfile/screen/DDND';
import DDNH from './src/newfile/screen/DDNH';
import HomeFour from './src/HomeFour';
import NextPage from './src/NextPage';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
const AppNavigator = createStackNavigator({
  HomeFour: {
    screen: HomeFour,
  },
  NextPage: {
    screen: NextPage,
  },
});
const AppContainer = createAppContainer(AppNavigator);
const App = () => {
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <AppContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
