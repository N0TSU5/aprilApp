import React from "react";
import { useState } from "react";
import { 
    Text,
    StyleSheet,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";

const SurveyText = ({id, title}) => {
    const [text, setText] = useState();
    return(
            <View style={styles.boxContainer}>
                <Text style={styles.textT}>{title}</Text>
                <TextInput
                    onChangeText={(text) => setText(text)}
                    value={text}
                    style={styles.input}
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
        height : '30%',
        marginTop: 30,
        flex: 1
    },
    textT: {
        fontSize: 24,
        paddingBottom: '5%',
        paddingTop: '2%'
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        height: '20%',
        marginBottom: '5%'        
    }
})
 
export default SurveyText