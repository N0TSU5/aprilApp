import React from 'react';
import "../../../ignoreWarnings";
import {
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

const RecomItem = ({ align, name, text, address, recom }) => {
  return (
      <View style={ (align == '1') ? {
        flexDirection: "row",
        justifyContent: "flex-end" } 
        : { flexDirection: "row",
        justifyContent: "flex-start"}
      }>
        <View style={styles.boxContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.recom}>{recom} recommended</Text>
        </View>
      </View> 
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99ffcc',
    height : 180,
    marginTop: '5%',
    width: '90%',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18,
    color: '#EB8761',
    paddingTop: '5%'
  },
  address: {
    fontSize: 14,
    color: '#EB8761',
    paddingTop: '5%'
  },
  recom: {
    color: '#0CBBA6',
    paddingLeft: '38%',
    paddingRight: '5%',
    paddingTop: '5%',
    fontSize: 18,
  }  
})

export default RecomItem