import React from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    View,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

const LoadingScreen = () => {

    const navigation = useNavigation();

    const clearData = async () => {
        try {
            await AsyncStorage.setItem(
                '@order_id',
                'null'
            );
            console.log("logged out")
        } catch (error) {
            console.log('error logging out!');
        }
    };

    const handleLogout = () => {
        clearData();
        navigation.navigate("Login")
    }


    return (
        <View style={styles.container}>
            <View style={styles.activityContainer}>
                <ActivityIndicator size="large" color="#660033" />
                <Text style={styles.text}>Logout failed due to network anomaly.</Text>
                <Text style={styles.text}>Please logout using the button below.</Text>
            </View>
            <TouchableOpacity style={buttonStyles.button} onPress={handleLogout}>
                <Text style={buttonStyles.buttontext}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    activityContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    text: {
        color: '#660033',
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10,
    },
});

const buttonStyles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#EE2737',
        marginTop: 30
    },
    buttontext: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    },
});

export default LoadingScreen;
