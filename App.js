
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTab from './src/Navigator/MainTab';
import Convertor from './src/Screens/Converter';
import SearchScreens from './src/Screens/Search';
const Stack = createNativeStackNavigator();

const App = () => {
  return ( 
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="MainHome" component={MainTab} /> 
          <Stack.Screen name="converter" component={Convertor} /> 
          <Stack.Screen name="search" component={SearchScreens} /> 
          {/* <Stack.Screen name="exchangechart" component={ExchangeChart} />  */}
        </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App