import React, { useEffect, useState } from 'react';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import RenderHTML from 'react-native-render-html';
import { DrawerActions } from '@react-navigation/native';
import PouchDB from 'pouchdb-react-native';
import "../ignoreWarnings";
import LoadingScreen from './LoadingScreen';
import Survey from './Survey'
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Button,
    StyleSheet,
    Modal
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

const WebDisplay = React.memo(function WebDisplay({ html }) {
    const { width: contentWidth } = useWindowDimensions();
    const tagsStyles = {
        a: {
            textDecorationLine: 'none',
        },
    };

    return (
        <RenderHTML
            contentWidth={contentWidth}
            source={{ html }}
            tagsStyles={tagsStyles}
            ignoredDomTags={['font']}
        />
    );
});

const HomePage = React.memo(() => {

    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(true);

    const [tourname, setTourName] = useState()
    const [departure, setDeparture] = useState();
    const [returned, setReturned] = useState();
    const [relative, setRelative] = useState();
    const [diff, setDiff] = useState();
    const [itinerary, setList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [surveyVisible, setSurveyVisible] = useState(false);
    const [item, setItem] = useState([])

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true, descending: false })
            .then((result1) => {
                return result1.rows[0].doc.data;
            })
            .then((firstDoc) => {
                setDeparture(firstDoc.datedeparture);
                setReturned(firstDoc.datereturn);
                setTourName(firstDoc.tourname);
                console.log(departure)
                return firstDoc.itinerary;
            })
            .then((itineraryObj) => {
                const list = Object.keys(itineraryObj).map(key => itineraryObj[key]);
                setList(list);
                setIsLoading(false);
                workDate(departure, returned);
            })
            .catch((err) => {
                console.log("home page error", err);
            });
    }, [departure, returned]);

    const workDate = (departure, returned) => {
        const dateFormat = moment();
        const date1 = dateFormat.format('YYYY-MM-DD HH:mm');
        const date2 = moment.tz(departure, 'GMT');
        const dateE = moment.tz(returned, 'GMT');
        const diff = Math.abs(date2.diff(date1, 'days'));
        setDiff(diff);

        const momentDate1 = moment(date1); // Convert date1 to a moment object

        if (momentDate1.isBefore(departure)) {
            setRelative('pre');
        } else if (momentDate1.isAfter(returned)) {
            if (Math.abs(diff) > 0) {
                setRelative('pst');
            }
        } else if (momentDate1.isAfter(departure) && momentDate1.isBefore(returned)) {
            setRelative('in');
        }
    };

    const renderModal = (day) => {
        const modalList = Object.keys(itinerary).map(key => itinerary[key])

        const groupedItinerary = [];
        if (modalList.length > 0) {
            let currentGroup = [modalList[0]];
            let currentDate = new Date(modalList[0].datestart);

            for (let i = 1; i < modalList.length; i++) {
                const item = modalList[i];
                const itemDate = new Date(item.datestart);

                if (itemDate.getTime() === currentDate.getTime()) {
                    currentGroup.push(item);
                } else {
                    groupedItinerary.push(currentGroup);
                    currentGroup = [item];
                    currentDate = itemDate;
                }
            }
            groupedItinerary.push(currentGroup);
        }
        const formattedList = []

        for (let i = 0; i < groupedItinerary.length; i++) {

            const currentItem = groupedItinerary[i]
            const currentLocation = currentItem[0].description
            const itemDate = moment(currentItem[0].datestart).format('dddd D MMMM');
            const itemIndex = i + 1
            const itemFooter = (currentItem[0].footer === null) ? '' : currentItem[0].footer

            let itemDescription = ''
            for (let j = 0; j < currentItem.length; j++) {
                const cDesc = currentItem[j].description
                if (cDesc !== currentLocation) {
                    itemDescription += cDesc
                } else if (cDesc.length > 30) {
                    itemDescription += cDesc
                }
            }
            if (currentLocation.length < 30) {
                formattedList.push([itemIndex, itemDate, currentLocation, itemDescription, itemFooter])
            } else {
                formattedList.push([itemIndex, itemDate, "", itemDescription, itemFooter])
            }
        }
        setItem(formattedList[day])
        setModalVisible(true)
    }

    const dayNoun = (diff == 1) ? 'day' : 'days';
    const hourPhrase = (diff > 0) ? `in ${diff} ${dayNoun}` : "tomorrow"

    return (

        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (

                <View style={containerStyles.container}>
                    <Modal
                        visible={modalVisible}
                        animationType='slide'
                        transparent={true}
                    >
                        <View style={modalStyles.modalContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', color: '#660033' }}>Day {item[0]}: {item[1]}</Text>
                            </View>
                            <RenderHTML source={{ html: item[2] }} baseStyle={{ fontWeight: 'bold', color: '#660033' }} contentWidth={width} />
                            <ScrollView
                                style={{ borderLeftColor: 'black', borderLeftWidth: 2, paddingLeft: 10 }}
                                maximumZoomScale={2}
                                minimumZoomScale={1}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >
                                <React.Fragment>
                                    <WebDisplay html={item[3]} />
                                    <WebDisplay html={item[4]} />
                                </React.Fragment>
                            </ScrollView>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={{ color: 'red', fontSize: 20 }}>{'\n'}Close itinerary</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        visible={surveyVisible}
                        onRequestClose={() => setSurveyVisible(false)}
                    >
                        <Survey />
                        <TouchableOpacity
                            style={buttonStyles.closeButton}
                            onPress={() => setSurveyVisible(false)}
                        >
                            <Text style={buttonStyles.closeButtonText}>Close</Text>
                        </TouchableOpacity>

                    </Modal>

                    {
                        relative == "pre" && (
                            <>
                                <Text style={greetStyles.greeting}>Welcome, </Text>
                                <Text style={greetStyles.countdown}>{tourname}{'\n\n'} begins {hourPhrase}</Text>
                            </>
                        )
                    }

                    {
                        relative == "in" && (
                            <>
                                <Text style={greetStyles.greeting}>Welcome, </Text>
                                <Text style={greetStyles.countdown}>Day {Math.abs(diff) + 1} of {tourname}</Text>
                                <TouchableOpacity style={greetStyles.viewDoc} onPress={() => renderModal(Math.abs(diff))}>
                                    <Text style={greetStyles.viewDocText}>View today's itinerary</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }

                    {
                        relative == "pst" && (
                            <>
                                <Text style={greetStyles.greeting}>Welcome, </Text>
                                <Text style={greetStyles.countdown}>{tourname} has ended</Text>
                                <TouchableOpacity style={greetStyles.viewDoc} onPress={() => setSurveyVisible(true)}>
                                    <Text style={greetStyles.viewDocText}>Please take the time to answer our quick survey</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }

                    <TouchableOpacity style={buttonStyles.button} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Text style={buttonStyles.buttontext}>Open Menu</Text>
                    </TouchableOpacity>

                    <Image source={require('../assets/TransindusLogoBlack.png')} style={greetStyles.bottomImage} resizeMode="contain" />

                </View>
            )}
        </>
    )
})

const modalStyles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        height: '75%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '25%',
    },
});

const greetStyles = StyleSheet.create({
    greeting: {
        flex: 1,
        color: '#660033',
        paddingTop: '10%',
        paddingLeft: '5%',
        fontSize: 38,
    },
    countdown: {
        flex: 2,
        color: '#660033',
        textAlign: 'left',
        paddingLeft: '5%',
        textAlignVertical: 'center',
        fontSize: 30
    },
    viewDoc: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '15%',
    },
    viewDocText: {
        color: 'purple',
        fontSize: 30,
        textDecorationLine: 'underline',
    },
    bottomImage: {
        position: 'absolute',
        flex: 1,
        bottom: 5,
        alignSelf: 'center',
        width: '70%',
        height: '10%',
    },
})

const buttonStyles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: '10%',
        borderRadius: 25,
        backgroundColor: 'orange',
        alignSelf: 'center',
        marginBottom: '30%'
    },
    buttontext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#660033',
    },
    closeButton: {
        backgroundColor: 'red',
        borderRadius: 20,
        paddingVertical: '6%',
        paddingHorizontal: '20%',
        alignSelf: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
})

const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
        textAlignVertical: 'center',
    },
    view: {
        color: '#00e673',
        textAlign: 'center',
        textShadowColor: '#000000',
        textShadowRadius: 10,
        fontSize: 30,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingBottom: '40%',
        borderColor: 'black',
    }
})

export default HomePage