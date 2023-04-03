import React from 'react';
import BackgroundImage from '../../../assets/munnar.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Itenary from '../../InfoPages/Itenary';
import { FlightTimeline } from '../../InfoPages/FlightTimeline';
import PurpleLogo from '../../../assets/greyLogo.png';
import { useEffect, useState } from 'react';
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet
} from "react-native";

const Stack = createStackNavigator();

const PHome = ({ rel, hours, mins, name, time }) => {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Back'>
        <Stack.Screen options={{ headerShown: false }} name="Back">
          {props => <Home {...props} name={name} time={time} rel={rel} hours={hours} mins={mins} />}
        </Stack.Screen>
        <Stack.Screen options={{
          headerTitle: (props) => <FlightTitle {...props} title={'Your Flight Timeline'} />,

          headerStyle: {
            backgroundColor: '#660033',
            height: 70,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
          name="Timeline">
          {props => <FlightTimeline {...props} name={name} />}
        </Stack.Screen>
        <Stack.Screen

          options={{
            headerTitle: (props) => <FlightTitle {...props} title={'Your Itinenary'} />,

            headerStyle: {
              backgroundColor: '#660033',
              height: 70,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
          name="Itenary">
          {props => <Itenary {...props} name={name} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const FlightTitle = ({ title }) => {
  return (
    <View>
      <Text style={styles.your}>{title}</Text>
    </View>
  )
}

const Home = ({ navigation, days, name, hours, mins, rel, time }) => {

  const clearData = async () => {
    try {
      await AsyncStorage.setItem(
        '@storage_Key',
        'reset'
      );
    } catch (error) {
      alert('error loggin out!');
    }
  };

  const logNav = async () => { clearData(); NativeDevSettings.reload() }

  const [m, setMins] = useState(mins + 1);
  const [h, setHours] = useState(hours);
  const [hT, setHT] = useState(' hours ');
  const [mT, setMT] = useState(' minutes ');

  useEffect(() => {

    if (h == 0) { setHours(''); }

    if (h == 1) { setHT(' hour '); }
    else if (h == '') { setHT(''); }
    else { setHT(' hours ') }

    if (m == 1) { setMT(' minute ') }
    else if (m == '') { setMT('') }
    else { setMT(' minutes ') }

  }, [h, m])

  useEffect(() => {
    let timer = setTimeout(function () {

      if (m == '' && h == 1) { setHours(''); setMins(59) }
      else if (m == 1 && h == '') { Restart(); }
      else if (m == 1) { setMins(''); }
      else if (m == '') { setMins(59); if (h !== '') { setHours(h - 1) } }
      else { setMins(m - 1); }

    }, (60000));
    return () => clearTimeout(timer)
  }, []);

  return (

    <View style={styles.container}>
      <View style={styles.container2}><Image source={PurpleLogo} style={styles.logo} /></View>
      <ImageBackground style={styles.image} source={BackgroundImage}>
        
        <Text style={styles.greeting}>Hello {name},</Text>
        <Text style={styles.countdown}>Your Flight begins in {'\n'} {h}{hT}{m}{mT} </Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('Timeline')}><Text style={styles.view}>
          View Flight Timeline {'\n'}
        </Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Itenary')}><Text style={styles.view}>
          View your Itinerary
        </Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logNav}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>

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
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 10,
    borderTopWidth: 0,
    borderColor: '#4d0019',
  },
  greeting: {
    flex: 1,
    color: '#ffffff',
    paddingTop: '15%',
    paddingLeft: '5%',
    fontSize: 39,
    textShadowColor: '#000000',
    textShadowRadius: 10
  },
  your: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  countdown: {
    flex: 1,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 39,
    textShadowColor: '#000000',
    textShadowRadius: 10,
    
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: '32%',
    marginBottom: '5%',
    marginTop: 90,
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
    //paddingBottom: '10%',
    borderColor: 'black',
  }
})

export default PHome;