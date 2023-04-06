import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from "./HomePage";
import IntroDoc from "./IntroDoc"
import Itinenary from "./Itinenary";

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
                    fontSize: 30
                },
            }}
        >
            <Drawer.Screen name="Home" component={HomePage} />
            <Drawer.Screen name="Introduction" component={IntroDoc} />
            <Drawer.Screen name="Itinenary" component={Itinenary} />
        </Drawer.Navigator>
    );
};

export default HomeDrawer