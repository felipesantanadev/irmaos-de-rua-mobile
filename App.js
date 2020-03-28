import React, {useState, useEffect} from 'react';
import { StatusBar, YellowBox } from 'react-native';
import RootPage from './src/pages/RootPage';
import * as Font from 'expo-font';
import { AuthProvider } from './src/context/AuthContext';

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
        dataLoaded && 
        <AuthProvider>
          <StatusBar barStyle="dark-content"  backgroundColor="#FFF" />
          <RootPage />
        </AuthProvider>
      }
    </>
  );
}