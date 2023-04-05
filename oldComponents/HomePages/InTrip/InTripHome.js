import React from 'react';
import IHome from './IHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Map from '../../MainPages/Map';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { View, Text } from "react-native";
import Itenary from '../../InfoPages/Itenary';
import Recom from '../../InfoPages/Recom';

const ITab = createBottomTabNavigator();

const InTripHome = ({ day, name }) => {
  return (
    <ITab.Navigator 
       initialRouteName='IHome'
       backBehavior='initialRoute'
       screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {backgroundColor: '#660033',},
      }} >
      <ITab.Screen 
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
      <ITab.Screen 
        name="IHome" 
        options={{
          tabBarIcon: ({color}) => (
          <MaterialIcons
            name="house"
            size={50}
            color={color}
          />), 
        }}
      >{props => <IHome {...props} name={name} day={day} />}
      </ITab.Screen>
      <ITab.Screen 
        name="Iitin" 
        initialParams={{'day': day }}
        options={{
          tabBarIcon: ({color}) => (
          <Ionicons
            name="information-circle-outline"
            size={50}
            color={color}
          />), 
        }}
      >{props => <Itenary {...props} day={day} titleView={true} />}
      </ITab.Screen>
      <ITab.Screen 
        name="IRec"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons
              name="recommend"
              size={46}
              color={color}
            />)
        }}
        component={Recom}      
      />     
    </ITab.Navigator>
  )
}

export default InTripHome