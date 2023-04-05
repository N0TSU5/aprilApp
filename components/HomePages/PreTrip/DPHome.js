import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Itenary from "../../InfoPages/Itenary";
import Contact from "./Contact";
import TPHome from "./TPHome";

const Drawer = createDrawerNavigator();

const DPHome = ({ days, uname, title }) => {
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
                    fontSize: 30
                },
            }}
        >
            <Drawer.Screen name="Home" component={TPHome} />
            <Drawer.Screen name="Itinenary" component={Itenary} />
            <Drawer.Screen name="Contacts" component={Contact} />
        </Drawer.Navigator>
    );
};

export default DPHome