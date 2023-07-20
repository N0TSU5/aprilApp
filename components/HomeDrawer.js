import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomePage from "./HomePage";
import IntroDoc from "./IntroDoc"
import Itinenary from "./Itinenary";
import Accomodation from "./Accomodation"
import Inclusions from "./Inclusions";
import KeyContacts from "./KeyContacts";
import Tips from "./Tips";
import Map from "./Map";
import LogFailed from './LogFailed'

const Drawer = createDrawerNavigator();

const HomeDrawer = ({ data }) => {
    const navigation = useNavigation();
    const [refreshed, setRefreshed] = useState(false);

    useEffect(() => {
        setRefreshed(true);
    }, []);

    const clearData = async () => {
        try {
            await AsyncStorage.setItem(
                '@order_id',
                'null'
            );
            console.log("logged out")
        } catch (error) {
            alert('error logging out!');
        }
    };

    const handleLogout = () => {
        clearData();
        navigation.navigate("Login")
    }

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
            {refreshed && (
                <Drawer.Screen
                    name="Logout failed"
                    options={{
                        drawerLabel: () => (
                            <TouchableOpacity onPress={handleLogout}>
                                <Text style={buttonStyles.buttontext}>Log Out</Text>
                            </TouchableOpacity>
                        ),
                        headerShown: true,
                        initialParams: {
                            logProper: "false",
                        }
                    }}
                    component={LogFailed}
                />
            )}
        </Drawer.Navigator>
    );

};

const buttonStyles = StyleSheet.create({
    button: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingVertical: 12,
        paddingHorizontal: 32,
        textAlign: 'center',
        marginHorizontal: '32%',
        marginBottom: '5%',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
    },
    buttontext: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'red',
    },
})

export default HomeDrawer;

