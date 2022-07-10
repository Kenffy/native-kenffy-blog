import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';
import BloggerScreen from './screens/BloggerScreen';
import CategoryScreen from './screens/CategoryScreen';
import MessagesScreen from './screens/MessagesScreen';
import SingleScreen from './screens/SingleScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Provider } from "react-redux";
import { configureStore } from './redux/store';
import Navbar from './components/Navbar';

const store = configureStore();



const Stack = createStackNavigator();
export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HOME"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="EXPLORE ALL POSTS"
        component={PostScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SINGLE POST"
        component={SingleScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EXPLORE BLOGGERS"
        component={BloggerScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EXPLORE ALL CATEGORIES"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MESSAGES"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PROFILE"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LOGIN"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="REGISTER"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <Provider store={store}>
      {/* <StatusBar style="auto" /> */}
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Navbar />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};
