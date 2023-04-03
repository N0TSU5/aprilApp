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

const Contact = () => {
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.title}>Transindus contact details</Text>
            <Text style={styles.text}>In office hours: 0044 20 8566 3739</Text>
            <Text style={styles.text}>Out of office hours: Tel. 0044 7970 189 468</Text>
            <Text style={styles.text}>Email address: enquiries@transindus.com</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.title}>Key contact details</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text}>Akorn DMC India</Text>
                <Text style={styles.text}>{'\t\t'}Dates: 02 Feb - 14 Feb</Text>
            </View>
            <Text style={styles.text}>Tel: +91 11 4600 1646 (office hours)</Text>
            <Text style={styles.text}>Mobile: +91 97736 10079</Text>
            <Text style={styles.text}>Emergency: +91 97736 10079</Text>
        </View>
      </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingLeft: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 8,
    },
});

export default Contact