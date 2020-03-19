import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StatusBar, YellowBox } from 'react-native';
import Routes from './src/routes';

import * as Font from 'expo-font';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'roboto-light': require('./assets/fonts/Roboto-Light.ttf')
      });
      setDataLoaded(true);
    }

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <>
      {
        dataLoaded ? (
          <>
            <StatusBar barStyle="dark-content"  backgroundColor="#FFF" />
            <Routes />
          </>
        )
        : null
      }
    </>
  );
}