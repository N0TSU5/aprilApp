import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    Linking
} from 'react-native';

const HotelTab = ({ name, nights, room, state, desc, link }) => {
  return (
    <View style={styles.boxContainer}>
      <Text style={styles.text2}>You are staying at {'\n'} {name}</Text>
      <Text style={styles.text1}>For {nights} nights</Text>
      <Text style={styles.text1}>In room {room}</Text>
      <Text style={styles.text1}>{state}</Text>
      <Text style={styles.text3}>{desc}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(link)}>
        <Text style={styles.text4}>View room details</Text>
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
      backgroundColor: '#993333',
      height : '100%',
      marginTop: 20,
      marginBottom: 10,
      borderWidth: 5,
  },
  text1: {
      color: '#999900',
      marginBottom: 10,
      fontSize: 24,
      textAlign: 'center',
      alignItems: 'center'
  },
  text2: {
    color: '#999900',
    marginBottom: 10,
    fontSize: 26,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  text3: {
    color: '#828970',
    paddingLeft: '8%',
    paddingRight: '5%',
    fontSize: 19,
  },
  text4: {
    color: '#0CBBA6',
    paddingLeft: '38%',
    paddingRight: '5%',
    paddingTop: '5%',
    fontSize: 18,
    textDecorationLine: 'underline'
  }
})

export default HotelTab;