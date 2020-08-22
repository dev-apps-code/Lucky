import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Home from '../screens/Main/Home'
import Bet from '../screens/Main/Bet';
import Data from '../screens/Main/Data';
import Transact from '../screens/Main/Transact';

import Lastwo from '../screens/Main/Bet/Lastwo'
import Suertres from '../screens/Main/Bet/Suertres'


import MainTabs from '../components/MainTabs';
import BetTabs from '../components/BetTabs';


const authStack = createStackNavigator()
const mainTabStack = createBottomTabNavigator()
const appStack = createStackNavigator();
const betTabStack = createMaterialTopTabNavigator()

const MainTabStackScreen = () => (
  <mainTabStack.Navigator tabBar={(props) => <MainTabs {...props} />}>
    <mainTabStack.Screen name="Home" component={Home}/>
    <mainTabStack.Screen name="Bet" component={BetTabStackScreen}/>
    <mainTabStack.Screen name="Data" component={Data}/>
    <mainTabStack.Screen name="Transact" component={Transact}/>
  </mainTabStack.Navigator>
);

const BetTabStackScreen = () => (
  <betTabStack.Navigator swipeEnabled={false}  tabBar={(props) => <BetTabs {...props} />}>
    <betTabStack.Screen name="Lastwo" component={Lastwo}/>
    <betTabStack.Screen name="Suertres" component={Suertres}/>
  </betTabStack.Navigator>
);



const AppStackScreen = () => (
  <appStack.Navigator>
    <appStack.Screen name="Main" component={MainTabStackScreen} />
  </appStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <AppStackScreen />
  </NavigationContainer>
);
