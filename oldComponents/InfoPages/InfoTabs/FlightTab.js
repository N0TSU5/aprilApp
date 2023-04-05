import React from 'react';
import {
    Text,
    StyleSheet,
    Linking,
    View,
    TouchableOpacity
} from 'react-native';

const FlightTab = ({ kid, home, away, depart, arrive, seats, date, link }) => {
  return (
    <View style={styles.boxContainer}>
        <Text style={styles.textID}>Flight {kid}</Text>
        <Text style={styles.tofro}>From {home}</Text>
        <Text style={styles.tofro}>To {away}{'\n'}</Text>
        <Text style={styles.onat}>On {date}, {depart} Local Time</Text>
        <Text style={styles.onat}>Arriving at {arrive} Local Time</Text>
        <Text style={styles.seat}>{'\t\n'}Your seats are: {seats}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
            <Text style={styles.text4}>View Flight Status</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    boxContainer: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#888980',
        height : '50%',
        marginTop: '4%',
        marginBottom: 7,
        borderWidth: 2,
        borderColor: 'black'
    },
    textID: {
        color: '#e6ac00',
        marginBottom: 7,
        fontSize: 24
    },
    onat: {
        alignSelf: 'flex-start',
        fontSize: 17,
        color: 'lightblue',
        marginLeft: '6%',
    },
    tofro:{
        alignSelf: 'center',
        fontSize: 18,
        color: 'lightblue', 
    },
    seat:{
        alignSelf: 'flex-end',
        fontSize: 20,
        color: '#ff8080',
        marginRight: '8%',
        paddingBottom: '1%'
    },
    text4: {
        color: '#0CBBA6',
        paddingLeft: '38%',
        paddingRight: '5%',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})

export default FlightTab;