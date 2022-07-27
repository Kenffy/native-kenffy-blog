import {createStackNavigator} from '@react-navigation/stack';
import ExploreBloggers from '../components/ExploreBloggers';
import ExploreCategories from '../components/ExploreCategories';
import ExplorePosts from '../components/ExplorePosts';
import BloggerScreen from '../screens/BloggerScreen';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from '../screens/ProfileScreen';
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
      <Stack.Screen name="Posts" component={ExplorePosts}/>
      <Stack.Screen name="Bloggers" component={ExploreBloggers}/>
      <Stack.Screen name="Categories" component={ExploreCategories}/>
      <Stack.Screen name="Single" component={SingleScreen}/>
      <Stack.Screen name="Write" component={WriteScreen}/>
    </Stack.Navigator>
  );
};


export const BloggerStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Bloggers" component={BloggerScreen} 
        options={({route}) => ({
          id: route.params?.id,
        })}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
    </Stack.Navigator>
  );
};