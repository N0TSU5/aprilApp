import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import PouchDB from 'pouchdb-react-native';
import "../ignoreWarnings";
import { useNavigation } from '@react-navigation/native';
import PurpleLogo from '../assets/greyLogo.png';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

const HomePage = () => {

    const navigation = useNavigation();

    const clearData = async () => {
        try {
            await AsyncStorage.setItem(
                '@order_id',
                'null'
            );
        } catch (error) {
            alert('error logging out!');
        }
    };

    const logNav = async () => {
        clearData()
        navigation.navigate("Login")
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
                console.error("home page error", err);
            });
    }, []);

    useEffect(() => {

        const date1 = moment.tz('2019-10-03 23:58 GMT', 'YYYY-MM-DD HH:mm z', 'GMT')
        const date2 = moment.tz(departure, 'GMT')
        const dateE = moment.tz(returned, 'GMT')

        setSHDiff(dateE.diff(date1, 'hours'));
        setHrDiff(date2.diff(date1, 'hours'));
        setDiff((date2.diff(date1, 'days')));
        setMinDiff((date2.diff(date1, 'minutes')) - (60 * hrDiff));

        if (date1.isBefore(departure)) {
            setRelative('pre');
        } else if (date1.isAfter(returned)) {
            if (Math.abs(diff) > 0) {
                setRelative("pst");
            }
        } else if (date1.isAfter(departure) && date1.isBefore(returned)) {
            setRelative("in");
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
    const hourPhrase = (diff > 0) ? `in ${diff} ${dayNoun}` : "tomorrow"

    return (

        <View style={containerStyles.container}>

            {relative == "pre" && (
                <>
                    <Text style={greetStyles.greeting}>Good {partOfDay}, </Text>
                    <Text style={greetStyles.countdown}>{tourname}{'\n'}begins {hourPhrase}</Text>
                </>
            )}

            {relative == "in" && (
                <>
                    <Text style={greetStyles.greeting}>Good {partOfDay}, </Text>
                    <Text style={greetStyles.countdown}>Day {Math.abs(diff)+1}</Text>
                </>
            )}

            <TouchableOpacity style={buttonStyles.button} onPress={logNav}>
                <Text style={buttonStyles.buttontext}>Log Out</Text>
            </TouchableOpacity>

            <View style={logoStyles.logoContainer}><Image source={PurpleLogo} style={logoStyles.logo} /></View>
        </View>
    )
}


const greetStyles = StyleSheet.create({
    greeting: {
        flex: 1,
        color: '#660033',
        paddingTop: '10%',
        paddingLeft: '5%',
        fontSize: 38,
    },
    countdown: {
        flex: 2,
        color: '#660033',
        textAlign: 'left',
        paddingLeft: '5%',
        textAlignVertical: 'center',
        fontSize: 30
    },
    viewDoc: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '15%',
    },
    viewDocText: {
        color: 'purple',
        fontSize: 30,
        textDecorationLine: 'underline',
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

const logoStyles = StyleSheet.create({
    logoContainer: {
        backgroundColor: 'black',
    },
    logo: {
        borderRadius: 50,
        resizeMode: 'contain',
        height: 50,
        width: 200,
        alignSelf: 'center',
    },
})

const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
        textAlignVertical: 'center',
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

export default HomePage