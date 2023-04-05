import React from 'react';
import { useState } from 'react';
import {
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

const ContactItem = ({ name, address, duration, tele, }) => {
  
    return (
      <View style={styles.boxContainer}>
        <View>
            <Text>{name}</Text>
            <Text>{duration}</Text>
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
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20,
    },
    topLine: {
        
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    date: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'purple'
    },
    accommodation: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'green',
    },
    mealplan: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'green',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
})
  

export default ContactItem;