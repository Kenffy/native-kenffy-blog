import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { HomeStack } from './Stacks';


const Drawer = createDrawerNavigator();


const UnAuthStack = () => {
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
          name="LOGIN"
          component={LoginScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="person-circle" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="REGISTER"
          component={RegisterScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="person-add" size={22} color={color} />
            ),
          }}
        />  
      </Drawer.Navigator>
    );
  };
  
  export default UnAuthStack;
  