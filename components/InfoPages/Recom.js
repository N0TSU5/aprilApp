import React from 'react'
import BackgroundImage from '../../assets/loginBG4.png';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import RecomItem from './InfoTabs/RecomItem';

const recomData = 
  [
    ['0','Kiyan Restaurant', 'Lorem ipsum dolor si ame, conseceur adipiscing eli.', 'NH-8, Samalkha, New Delhi, Delhi 110037,', 'Agent', '1'],
    ['0', 'Varq Restaurant', 'Nunc ac massa laoree eli sagiis viverra non vel dolor.', 'The Taj Mahal Hotel, No.1, Near, Man Singh Rd,', 'Agent', '2'],
    ['1', 'Desi Villagio', 'Vesibulum mollis dolor a cursus molesie. Maecenas purus quam.', 'N-95, 2nd Floor, Connaught Cir, Connaught Place,', 'Client', '3'],
    ['0', 'Saravanaa Bhavan', 'Ineger vel gravida felis. Nulla fringilla u juso a gravida.', '50, Janpath Rd, Atul Grove Road, Janpath,', 'Agent', '4']
  ]

const Recom = () => {
  return (
    <>
    <Text style={styles.inTitle}>Specialist Recommendations</Text>
    <ScrollView>
      <ImageBackground style={styles.background} source={BackgroundImage}>
        { recomData.map(item => {
          return(
            <RecomItem align={item[0]} name={item[1]} text={item[2]} address={item[3]} recom={item[4]} />
          )})
        }
      </ImageBackground>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  inTitle: {
    fontSize: 26,
    height: '10%',
    textAlign: 'center',
    paddingTop: 18,
    backgroundColor: '#ffa64d',
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

export default Recom