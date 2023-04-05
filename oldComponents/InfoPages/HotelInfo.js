import React from 'react';
import BackgroundImage from '../../assets/loginBG4.png';
import HotelTab from './InfoTabs/HotelTab';
import {
    Text,
    ImageBackground,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

const hotel_info = [
  ['1','The Grand New Dehli', '5A Deluxe', '7', 'All Inclusive', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'https://www.thegrandnewdelhi.com/rooms/deluxe-suites.html'],
]

const HotelInfo = () => {
  return (
   <ImageBackground style={styles.background} source={BackgroundImage}>
    <ScrollView>
      {hotel_info.map(item => {
        return(
          <HotelTab key={item[0]} link={item[6]} desc={item[5]} name={item[1]} room={item[2]} nights={item[3]} state={item[4]} />
      )})}
    </ScrollView>
   </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderWidth: 10,
    borderTopWidth: 0, 
    borderColor: '#4d0019',
  },
})

export default HotelInfo;