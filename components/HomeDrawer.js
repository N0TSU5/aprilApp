import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from "./HomePage";
import IntroDoc from "./IntroDoc"
import Itinenary from "./Itinenary";
import Accomodation from "./Accomodation"
import Inclusions from "./Inclusions";
import KeyContacts from "./KeyContacts";
import Tips from "./Tips";
import Map from "./Map";

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#ffa64d',
                    width: 200,
                },
                labelStyle: {
                    fontSize: 50,
                },
                drawerActiveTintColor: "#BC4B52",
                drawerInactiveTintColor: '#000066',
                headerStyle: {
                    backgroundColor: '#660033',
                },
                headerTintColor: 'orange',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 25
                },
            }}
        >
            <Drawer.Screen name="Home" component={HomePage} />
            <Drawer.Screen name="Introduction" component={IntroDoc} />
            <Drawer.Screen name="Itinerary" component={Itinenary} />
            <Drawer.Screen name="Inclusions" component={Inclusions} />
            <Drawer.Screen name="Accommodation" component={Accomodation} />
            <Drawer.Screen name="Key Contacts" component={KeyContacts} />
            <Drawer.Screen name="Tips" component={Tips} />
            <Drawer.Screen name="Map" component={Map} />
        </Drawer.Navigator>
    );
};

export default HomeDrawer