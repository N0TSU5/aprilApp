import React from 'react';
import FlightTab from './InfoTabs/FlightTab';
import BackgroundImage from '../../assets/loginBG4.png';
import {
    Text,
    ImageBackground,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

const flight_info = [
  ["1","London Heathrow", "Dubai International", "9th October 22", "12:00 PM", "23:00 PM", "32A, 34B, 35B", 'https://fs.qatarairways.com/flightstatus/search'],
  ["2","Dubai International", "New Delhi Airport", "10th October 22", "00:00 AM", "08:30 AM", "18F, 18G, 18E", 'https://fs.qatarairways.com/flightstatus/search']
]

const FlightInfo = () => {
  return (
  <ImageBackground style={styles.background} source={BackgroundImage}>
    <ScrollView>
      {flight_info.map(item => {
        return(
          <FlightTab key={item[0]} kid={item[0]} home={item[1]} away={item[2]} 
          date={item[3]} link={item[7]} depart={item[4]} arrive={item[5]} seats={item[6]}/>
      )}  )}
    </ScrollView>
   </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 10,
    borderTopWidth: 0, 
    borderColor: '#4d0019',
  },
})

export default FlightInfo;