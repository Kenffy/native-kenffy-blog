import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import SingleScreen from "../screens/SingleScreen";
import WriteScreen from "../screens/WriteScreen";



const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} 
        options={({route}) => ({
          id: route.params?.id,
        })}/>
      <Stack.Screen name="Single" component={SingleScreen}/>
      <Stack.Screen name="Write" component={WriteScreen}/>
    </Stack.Navigator>
  );
};