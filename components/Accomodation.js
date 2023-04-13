import React, { useEffect, useState } from 'react';
import "../ignoreWarnings";
import PouchDB from 'pouchdb-react-native';
import RenderHTML from 'react-native-render-html';
import moment from 'moment'
import LoadingScreen from './LoadingScreen';
import { useWindowDimensions } from 'react-native';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from "react-native";

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

const Accomodation = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { width } = useWindowDimensions();
    const [accomList, setList] = useState([])

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true })
            .then((result) => {
                const firstDoc = result.rows[0].doc;
                const accomsObj = firstDoc.data.accommodation
                setList(Object.keys(accomsObj).map(key => accomsObj[key]))
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("accoms error", err);
            });
    }, []);

    const formattedList = []
    for (let i = 0; i < accomList.length; i++){
        const currentItem = accomList[i]
        const address = currentItem.address 
        const dates = currentItem.datestartend
        const first = currentItem.firstdatestart
        const name = currentItem.name
        const phone = currentItem.phone
        formattedList.push([address, dates, first, name, phone])
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.instructions}>To call from within the city dial number only. {'\n'}To call from outside the city dial city code (including zero) and number. {'\n'}To call from UK, dial 00 then country code (see below), city code (EXCLUDING zero) and number.</Text>
                    </View>
                    {formattedList.map((item, index) => (
                        <View style={styles.container} key={index}>
                            <View>
                                <Text style={styles.title}>Hotel: {item[3]}</Text>
                                <Text>{'\n'}{item[1]}{'\n'}</Text>
                            </View>
                            <View>
                                <Text>Address: {item[2]}</Text>
                                <Text>Tel: {item[3]}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontWeight: 'bold',
        color: '#660033'
    },
    instructions: {
        fontSize: 16,
        lineHeight: 24
    }
});

export default Accomodation