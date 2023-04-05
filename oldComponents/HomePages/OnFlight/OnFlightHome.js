import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NHome from './NHome';
import FlightInfo from '../../InfoPages/FlightInfo';
import HotelInfo from '../../InfoPages/HotelInfo';
import LogOut from '../../MainPages/LoginPage';
import RNRestart from 'react-native-restart';
import Map from '../../MainPages/Map';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import {Text} from 'react-native'
const NTab = createBottomTabNavigator();

const OnFlightHome = ({ rel,hours,mins,name }) => {
  return (
    <NTab.Navigator 
       initialRouteName='NHome'
       backBehavior='initialRoute'
       screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {backgroundColor: '#660033',},
      }} >
      <NTab.Screen 
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons
              name="map-outline"
              size={40}
              color={color}
            />
          ), 
        }}
      />
      <NTab.Screen 
        name="NHome" 
       //initialParams={{'mins': mins }}
        options={{
          tabBarIcon: ({color}) => (
          <Ionicons
            name="information-circle-outline"
            size={50}
            color={color}
          />), 
        }}
      >{props => <NHome {...props} name={name} hours={hours} mins={mins} />}
      </NTab.Screen>
      <NTab.Screen 
        name="Your Flight Information"
        component={FlightInfo}
        inactiveColor='red'
        activeColor='blue'
        options={{
          headerStyle: {
            backgroundColor: '#660033',
            height: 70,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShown: "true",
          tabBarIcon: ({color}) => (
            <MaterialIcons 
              name="flight"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <NTab.Screen 
        name="Your Accomodation Information"
        component={HotelInfo}
        options={{
          headerStyle: {
            backgroundColor: '#660033',
            height: 70,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShown: "true",
          tabBarIcon: ({color}) => (
            <MaterialIcons
              name="hotel"
              size={40}
              color={color}
            />
          ),
        }}
      />
    </NTab.Navigator>
  )
}

export default OnFlightHome;