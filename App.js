import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { configureStore } from './redux/store';
import Navbar from './components/Navbar';

import AppStack from './navigation/AppStack';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Navbar />
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};
