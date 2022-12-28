
import React from 'react'
import { View, Text,StyleSheet,style,Image, ScrollView } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import SearchScreens from '../Screens/Search';
import HistoryScreen from '../Screens/History';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return ( 
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarShowLabel: false,
        showIcon: false,
        tabBarStyle:[ {
          position:"relative",
          elevation:0,
          backgroundColor:"#ffffff",
          height:70,
          ...styles.shadow
        },],
        activeTintColor: 'pink',
      }}
    >
    <Tab.Screen name="Home" component={HomeScreen} options={{
      tabBarIcon:({focused})=>(
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <Image
          source={{uri:"https://cdn-icons-png.flaticon.com/128/25/25694.png"}}
          resizeMode='contain'
          style={{
            width:25,
            height:25,
            tintColor:focused ? '#047BD5' : 'black'
          }}
          />
          <Text style={{color:focused ? '#047BD5' : 'black',fontFamily:"SourceSansPro-Regular"}}>Home</Text>
        </View>
      )
    }}/>

    <Tab.Screen name='Search' component={SearchScreens} options={{
      tabBarIcon:({focused})=>(
        <View style={{alignItems:"center",justifyContent:"center"}}>
          <Image
          source={{uri:"https://cdn-icons-png.flaticon.com/128/149/149852.png"}}
          resizeMode='contain'
          style={{
            width:25,
            height:25,
            tintColor:focused ? '#047BD5' : 'black'
          }}
          />
          <Text style={{color:focused ? '#047BD5' : 'black',textAlign:"center",fontFamily:"SourceSansPro-Regular"}}>Search</Text>
        </View>
      )
    }}
    />
    <Tab.Screen name='History' component={HistoryScreen} options={{
      tabBarIcon:({focused})=>(
        <View style={{alignItems:"center",justifyContent:"center"}}>
          <Image
          source={{uri:"https://cdn-icons-png.flaticon.com/128/565/565526.png"}}
          resizeMode='contain'
          style={{
            width:25,
            height:25,
            tintColor:focused ? '#047BD5' : 'black'
          }}
          />
          <Text style={{color:focused ? '#047BD5' : 'black',textAlign:"center",fontFamily:"SourceSansPro-Regular"}}>History</Text>
        </View>
      )
    }}
    />
    </Tab.Navigator>
  )
}

const styles= StyleSheet.create({
  shadow:{
    shadowColor:"lightblue",
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
});

export default MainTab