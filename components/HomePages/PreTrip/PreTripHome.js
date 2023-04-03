import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PHome from './PHome';
import TPHome from './TPHome';
import FlightInfo from '../../InfoPages/FlightInfo';
import HotelInfo from '../../InfoPages/HotelInfo';
import LogOut from '../../MainPages/LoginPage';
import OnFlightHome from '../OnFlight/OnFlightHome';
import Map from '../../MainPages/Map';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

const PTab = createBottomTabNavigator();

const PreTripHome = ({ rela,days,name }) => {
  return (
    <PTab.Navigator 
        initialRouteName="PHome"
        screenOptions={{
          headerShown: false, 
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {backgroundColor: '#660033',},
      }}>
      <PTab.Screen 
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
      <PTab.Screen 
        name="PHome" 
        initialParams={{'day': days }}
        options={{
          tabBarIcon: ({color}) => (
          <Ionicons
            name="information-circle-outline"
            size={50}
            color={color}
          />), 
        }}
      >{props => <TPHome {...props} name={name} days={days} />}
      </PTab.Screen>
      <PTab.Screen 
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
      <PTab.Screen 
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
    </PTab.Navigator>
  )
}

export default PreTripHome;