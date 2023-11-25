import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screen/Home';
import Search from './screen/Search';

import { Dimensions, LogBox, Platform, Text, View } from 'react-native';
import { themeColors } from '../theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeIcon as HomeOutline, MagnifyingGlassIcon as SearchOutline} from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid,  MagnifyingGlassIcon as SearchSolid} from 'react-native-heroicons/solid';
import SplashScreen from './screen/SplashScreen';
import MovieDetailScreen from './screen/Detail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS === 'ios';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        contentStyle: {backgroundColor: 'white'}
      }}>
        <Stack.Screen name="Splash" options={{headerShown: false}} component={SplashScreen} />
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeTabs} />
        <Stack.Screen name="Detail" options={{headerShown: false}} component={MovieDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}

function HomeTabs(){
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          height: 75,
          alignItems: 'center',
          backgroundColor: themeColors.mainColor,
        },
        tabBarItemStyle: {
          marginTop: ios? 30: 0,
          
        }
      })}
      
      >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
    </Tab.Navigator>
  )
}

const menuIcons = (route, focused)=> {
  let icon;
  
  if (route.name === 'home') {
    icon =  focused? <HomeSolid size="30" color={themeColors.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color={themeColors.inactiveLink} />
  } else if (route.name === 'search') {
    icon =  focused? <SearchSolid size="30" color={themeColors.bgLight} /> : <SearchOutline size="30" strokeWidth={2} color={themeColors.inactiveLink} />
  }

  let buttonClass = focused? "bg-white": "";
  return (
    <View className={"flex items-center rounded-full p-3 shadow jus " + buttonClass}>
      {icon}
    </View>
  )
}