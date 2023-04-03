import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Itenary from '../../InfoPages/Itenary';
import "../../../ignoreWarnings";
import BackgroundImage from '../../../assets/temple-coast.png';
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import PurpleLogo from '../../../assets/greyLogo.png';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    ScrollView
} from "react-native";
import Contact from './Contact';

const Drawer = createDrawerNavigator();

const TPHome = ({ rela, days, uname, title }) => {
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
            <Drawer.Screen name="Home">
                {props => <Home {...props} days={days} uname={uname} title={title} />}
            </Drawer.Screen>
            <Drawer.Screen name="Itinenary" component={Itenary} />
            <Drawer.Screen name="Contacts" component={Contact} />
        </Drawer.Navigator>
    );
};



const Home = ({ rela, days, uname, title }) => {

    const clearData = async () => {
        try {
            await AsyncStorage.setItem(
                '@storage_Key',
                'reset'
            );
        } catch (error) {
            alert('error logging out!');
        }
    };

    const logNav = async () => { clearData(); NativeDevSettings.reload() }

    const dayNoun = (days == '1') ? 'day' : 'days';

    return (

        <View style={styles.container}>
            <ImageBackground style={styles.background} source={BackgroundImage}>
            <Text style={styles.greeting}>Hello {uname},</Text>
            <Text style={styles.countdown}>{title}{'\n'}begins in {days} {dayNoun}</Text>

            <TouchableOpacity style={styles.button} onPress={logNav}>
                <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>

            <View style={styles.container2}><Image source={PurpleLogo} style={styles.logo} /></View>
            </ImageBackground>

        </View>

    )
}

const styles = StyleSheet.create({
    container2: {
        backgroundColor: 'black',
    },
    logo: {
        borderRadius: 50,
        resizeMode: 'contain',
        height: 50,
        width: 200,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        textAlignVertical: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        borderWidth: 10,
        borderTopWidth: 0,
        borderColor: '#4d0019',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        borderWidth: 10,
        borderTopWidth: 0, 
        borderBottomWidth: 0,
        borderColor: '#4d0019',
    },
    greeting: {
        flex: 1,
        color: 'white',
        paddingTop: '10%',
        paddingLeft: '5%',
        fontSize: 38,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1
    },
    countdown: {
        flex: 2,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 34,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20
    },
    button: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginHorizontal: '32%',
        marginBottom: '5%',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    view: {
        color: '#00e673',
        textAlign: 'center',
        textShadowColor: '#000000',
        textShadowRadius: 10,
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingBottom: '40%',
        borderColor: 'black',
    }
})

export default TPHome