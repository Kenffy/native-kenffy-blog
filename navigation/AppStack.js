import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import BloggerScreen from '../screens/BloggerScreen';
import SettingScreen from '../screens/SettingScreen';
import MessagesScreen from '../screens/MessagesScreen';
import WriteScreen from '../screens/WriteScreen';
import { BloggerStack, HomeStack } from './Stacks';


const Drawer = createDrawerNavigator();


const AuthStack = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props}/>}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: 'rgba(0,0,0,0.1)',
          drawerActiveTintColor: 'teal',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -18,
            fontSize: 15,
          },
        }}>
        <Drawer.Screen
          name="HOME"
          component={HomeStack}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        />
        
        <Drawer.Screen
          name="EXPLORE"
          component={BloggerStack}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="earth" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="MY BLOG"
          component={ProfileScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="person" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="WRITE"
          component={WriteScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="create" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="MESSAGES"
          component={MessagesScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="mail" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="SETTINGS"
          component={SettingScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="settings" size={22} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };
  
  export default AuthStack;
  