import React from 'react';
import BackgroundImage from '../../../assets/humayun.png';
import PurpleLogo from '../../../assets/greyLogo.png';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from "react-native-modal";
import "../../../ignoreWarnings";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    StatusBar,
    SafeAreaView,
    StyleSheet
} from "react-native";

const Stack = createStackNavigator();

const itenaryData = 
  [
    ['1',"Settle in","Arrive at 6:45 PM at the international airport. Meet your taxi driver from India Taxi Company and settle in at the Rajasthan Hotel."],
    ['2',"Anything","You can wander about, feel free to take a stroll in the village, and eat at KFC: a very exotic and cultural restaurant."],
    ['3',"Do that","Lorem ipsum dolor si ame, conseceur adipiscing eli. Duis sed sapien si ame eli laoree lucus loboris a lacus. Fusce varius era ac era dicum mais. Donec quis ipsum a eros maximus lucus."],
    ['4',"Go here","Nunc ac massa laoree eli sagiis viverra non vel dolor. Quisque odio augue, egesas ac finibus a, elemenum eu libero. Mauris eu faucibus juso, quis pellenesque meus."],
    ['5',"Go there","Ineger vel gravida felis. Nulla fringilla u juso a gravida. Fusce ac dicum leo. Fusce id sagiis eli. In u convallis neque. Duis mais, nibh a dicum finibus, nisl eli pharera mi, vel ulrices mauris sapien viae ligula."],
    ['6',"See that","Lorem ipsum dolor si ame, conseceur adipiscing eli. Duis sed sapien si ame eli laoree lucus loboris a lacus. Fusce varius era ac era dicum mais. Donec quis ipsum a eros maximus lucus."],
    ['7',"See this","Vesibulum mollis dolor a cursus molesie. Maecenas purus quam, pharera eu facilisis id, porior a ane. Praesen vel ex eu oror faucibus facilisis. Donec incidun a odio ornare laoree."],
    ['8',"Complete the Survey","Nunc ac massa laoree eli sagiis viverra non vel dolor. Quisque odio augue, egesas ac finibus a, elemenum eu libero. Mauris eu faucibus juso, quis pellenesque meus."],
    ['9',"Anything","Lorem ipsum dolor si ame, conseceur adipiscing eli. Duis sed sapien si ame eli laoree lucus loboris a lacus. Fusce varius era ac era dicum mais. Donec quis ipsum a eros maximus lucus."],
    ['10',"Do something","Vesibulum mollis dolor a cursus molesie. Maecenas purus quam, pharera eu facilisis id, porior a ane. Praesen vel ex eu oror faucibus facilisis. Donec incidun a odio ornare laoree."],
    ['11',"Do something","Nunc ac massa laoree eli sagiis viverra non vel dolor. Quisque odio augue, egesas ac finibus a, elemenum eu libero. Mauris eu faucibus juso, quis pellenesque meus."],
    ['12',"Watch the Sunset","Ineger vel gravida felis. Nulla fringilla u juso a gravida. Fusce ac dicum leo. Fusce id sagiis eli. In u convallis neque. Duis mais, nibh a dicum finibus, nisl eli pharera mi, vel ulrices mauris sapien viae ligula."],
  ]  
  
const IHome = ({ name, day }) => {

    const clearData = async () => {
        try {
          await AsyncStorage.setItem(
            '@storage_Key',
            'reset'
          );
          NativeDevSettings.reload()
        } catch (error) {
          alert('error logging out!');
        }
      };
    
    const logNav = async()=>{clearData();}

    const title = itenaryData[day-1][1]
    const str = itenaryData[day-1][2]

    var int = 0;
    for (let i in str) {
        i = str[i]

        var other_temp = str;
        if (int > 60 && i == " ") {

            var y = str.length - int;
            var another_int = -y;
            other_temp = other_temp.slice(0, another_int)
            break
        }
        else {
            int++;
        };
    };
    other_temp = other_temp.concat("...")
    const dayText = other_temp

    const [isModalVisible, setVisible] = useState(false)

    changeVisible = () => {
        setVisible(!isModalVisible)
    }
  
    return (
        <View style={styles.container}>
            <View style={styles.container2}><Image source={PurpleLogo} style={styles.logo} /></View>

            <ImageBackground style={styles.image} source={BackgroundImage}>

                <Text style={styles.greeting}>Hello {name},</Text>

                <SafeAreaView style={styles.containerD}>
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Day {day}: {title}</Text>
                        <TouchableOpacity onPress={changeVisible}>
                            <Text style={styles.readMore}>Read today's Itinerary</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                <TouchableOpacity onPress={logNav} style={styles.button}>
                    <Text style={styles.text}>Log Out</Text>
                </TouchableOpacity>

                <View>
                    <Modal isVisible={isModalVisible}>
                        <View style={modalStyles.centeredView}>
                            <View style={modalStyles.modalView}>
                                <Text style={modalStyles.textStyle}>Day {day}: {title}</Text>
                                <Text style={modalStyles.modalText}>{str}</Text>
                                <TouchableOpacity style={modalStyles.button} onPress={changeVisible}><Text style={styles.buttonClose}>Exit</Text></TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </ImageBackground>
        </View>
    )
}

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 10,
        backgroundColor: "chocolate",
        borderRadius: 50,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 50,
        backgroundColor: '#aa00ff',
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        fontSize: 30
    },
    textStyle: {
        color: "#660066",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 30
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: '#0000ff',
        fontSize: 18
    }
})

const styles = StyleSheet.create({
    containerD: {
        flex: 1,
        alignItems: 'center',
        marginBottom: '20%'
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: '600',
        color: '#6600cc',
        textDecorationLine: 'underline'
    },
    readMore: {
        fontSize: 28,
        marginTop: 9,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'lightblue'
    },
    card: {
        height: '100%',
        width: '70%',
        borderRadius: 25,
        backgroundColor: 'chocolate',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.85,
    },
    card2: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    container3: {
        borderRadius: 4,
        borderColor: 'black'
    },
    container2: {
        backgroundColor: 'black',
    },
    logo: {
        borderRadius: 50,
        resizeMode: 'contain',
        height: 50,
        width: 200,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        borderWidth: 10,
        borderTopWidth: 0,
        borderColor: '#4d0019',

    },
    greeting: {
        flex: 1,
        color: '#ffffff',
        paddingTop: '15%',
        paddingLeft: '5%',
        fontSize: 39,
        textShadowColor: '#000000',
        textShadowRadius: 10
    },
    your: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    countdown: {
        flex: 1,
        color: '#ffffff',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 39,
        textShadowColor: '#000000',
        textShadowRadius: 10
    },
    button: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginHorizontal: '32%',
        marginBottom: '8%',
        marginTop: 90,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
        width: '45%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    view: {
        color: '#00e673',
        textAlign: 'center',
        textShadowColor: '#000000',
        textShadowRadius: 10,
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        borderColor: 'black',
    }
})

export default IHome;