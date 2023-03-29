import React from 'react';
import { StatusBar, SafeAreaView, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import AppNavigator from './src/navigation';
import { AppContextProvider } from './src/context/AppContext';
import { UserContextProvider } from './src/context/UserContext';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  let [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
  });

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AppContextProvider>
      <UserContextProvider>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNavigator />
        </SafeAreaView>
      </UserContextProvider>
    </AppContextProvider>
  );
};

export default App;
