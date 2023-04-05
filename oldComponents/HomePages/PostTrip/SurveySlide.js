import React from "react";
//import StarRating from 'react-native-star-rating';
import { useState } from "react";
import { 
    Text,
    StyleSheet,
    View
} from "react-native";

const SurveySlide = () => {
    return(
        <View>
            <Text>asdjas</Text>
        </View>
    )
}

/*
const SurveySlide = ({id, max, title}) => {
    const [val, setVal] = useState(3)
    return(
        <View style={styles.boxContainer}>
            <Text style={styles.textT}>{title}</Text>
            <StarRating
                disabled={false}
                maxStars={5}
                rating={val}
                selectedStar={(rating) => setVal(rating)}
                fullStarColor={'orange'}
            />            
        </View>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C0E2E5',
        height : 160,
        marginTop: 30,
    },
    textT: {
        fontSize: 26,
        paddingBottom: '5%'
    }
})
*/
export default SurveySlide;