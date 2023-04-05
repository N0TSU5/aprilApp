import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Itenary from '../../InfoPages/Itenary';
import moment, { min } from 'moment';
import PouchDB from 'pouchdb-react-native';
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

const TPHome = ({ days, uname, title }) => {
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


const Home = () => {

    const clearData = async () => {
        try {
            await AsyncStorage.setItem(
                '@order_id',
                'reset'
            );
        } catch (error) {
            alert('error logging out!');
        }
    };

    const logNav = async () => { 
        clearData()
        NativeDevSettings.reload() 
    }

    const [tourname, setTourName] = useState()
    const [departure, setDeparture] = useState();
    const [returned, setReturned] = useState();
    const [relative, setRelative] = useState();
    const [diff, setDiff] = useState();
    const [minDiff, setMinDiff] = useState();
    const [hrDiff, setHrDiff] = useState();
    const [sHrDiff, setSHDiff] = useState();
    const [partOfDay, setDayPart] = useState();

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true })
            .then((result) => {
                const firstDoc = result.rows[0].doc;
                setDeparture(firstDoc.data.datedeparture);
                setReturned(firstDoc.data.datereturn);
                setTourName(firstDoc.data.tourname);
            })
            .catch((err) => {
                console.error("tphome error", err);
            });
    }, []);


    useEffect(() => {

        const date1 = moment('2019-10-01 20:34', 'YYYY-MM-DD HH:mm');
        const date2 = moment(departure);
        const dateE = moment(returned);

        setSHDiff(dateE.diff(date1, 'hours'));
        setHrDiff(date2.diff(date1, 'hours'));
        setDiff(date2.diff(date1, 'days'));
        setMinDiff((date2.diff(date1, 'minutes')) - (60 * hrDiff));

        if (Math.floor(diff) == 0 && date1.isBefore(departure)) {
            setRelative("onD");
        } else if (Math.floor(diff) == 0 && date1.isAfter(departure)) {
            setRelative("inD");
        } else if (Math.floor(diff) > 0 && date1.isBefore(departure)) {
            setRelative('pre');
        } else if (date1.isAfter(returned)) {
            if (Math.abs(diff) > 0) {
                setRelative("pst");
            }
        } else if (date1.isAfter(departure) && date1.isBefore(returned)) {
            setRelative("in");
        }
        else {
            console.log("none")
        }

        let currentHour = date1.hour()
        if (currentHour < 12 && currentHour >= 5) {
            setDayPart('morning')
        } else if (currentHour < 20 && currentHour >= 12) {
            setDayPart('afternoon')
        } else if (currentHour >= 20 || currentHour < 5) {
            setDayPart('evening')
        }

    }, [[returned, departure]]);

    const dayNoun = (diff == 1) ? 'day' : 'days';
    const hourNoun = (hrDiff == 1) ? 'hour' : 'hours';
    const minNoun = (minDiff == 1) ? 'minute' : 'minutes';
    const hourPhrase = (minDiff == 0) ? `${hrDiff} ${hourNoun}` : `${hrDiff} ${hourNoun}, ${minDiff} ${minNoun}`

    return (

        <View style={styles.container}>
            
            {relative == "pre" && (
                <>
                    <Text style={greetStyles.greeting}>Good {partOfDay}, </Text>
                    <Text style={greetStyles.countdown}>{tourname}{'\n'}begins in {hrDiff} {dayNoun}</Text>
                </>
            )}

            {relative == "onD" && (
                <>
                    <Text style={greetStyles.greeting}>Good {partOfDay}, </Text>
                    <Text style={greetStyles.countdown}>{tourname}{'\n'}begins in {hourPhrase}</Text>
                </>
            )}

            {relative == "in" && (
                <>
                    <Text style={greetStyles.greeting}>Good {partOfDay}, </Text>
                    <Text style={greetStyles.countdown}>{tourname}{'\n'}begins in {hourPhrase}</Text>
                </>
            )}

            <TouchableOpacity style={buttonStyles.button} onPress={logNav}>
                <Text style={buttonStyles.buttontext}>Log Out</Text>
            </TouchableOpacity>

            <View style={styles.container2}><Image source={PurpleLogo} style={styles.logo} /></View>
        </View>
    )
}


const greetStyles = StyleSheet.create({
    greeting: {
        flex: 1,
        color: '#ff6600',
        paddingTop: '10%',
        paddingLeft: '5%',
        fontSize: 38,
    },
    countdown: {
        flex: 2,
        color: '#6600cc',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 34
    },
})

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
        color: 'white',
    },
})

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