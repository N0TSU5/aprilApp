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

const ItenaryItem = ({ date , text , title, accomodation, mealPlan }) => {

    const [expanded, setExpanded] = useState(false);
  
    const handleExpand = () => {
      setExpanded(!expanded);
    }
  
    return (
      <View style={[styles.boxContainer, { height: expanded ? 250 : 80 }]}>
          <TouchableOpacity style={styles.titleContainer} onPress={handleExpand}>
            <Text style={styles.date}>Day {date}: {title} </Text>
            <Text>{expanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {expanded && (
                <>
                    <Text style={styles.description}>{text}</Text>
                    <Text style={styles.accommodation}>
                        {'\n'}
                        Accommodation: {accomodation}
                    </Text>
                    <Text style={styles.mealplan}>Meal plan: {mealPlan}</Text>
                </>
            )}
      </View>
    )
  }

  const styles = StyleSheet.create({
    boxContainer: {
        shadowColor: '#660033',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20,
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
        color: '#5b089b'
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
  

export default ItenaryItem;