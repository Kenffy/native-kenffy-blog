import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { configureStore } from './redux/store';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';

import AppStack from './navigation/AppStack';

const store = configureStore();
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
        
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 30: 0,
  },
});
