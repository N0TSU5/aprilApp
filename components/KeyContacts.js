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

const KeyContacts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { width } = useWindowDimensions();
    const [conList, setList] = useState([])

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true })
            .then((result) => {
                const firstDoc = result.rows[0].doc;
                const conObj = firstDoc.data.keycontacts
                setList(Object.keys(conObj).map(key => conObj[key]))
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("contactskey error", err);
            });
    }, []);

    const formattedList = []
    for (let i = 0; i < conList.length; i++) {
        const currentItem = conList[i]
        const address = currentItem.address
        const cname = currentItem.cname
        const name = currentItem.name
        const phones = [currentItem.phone, currentItem.phone2, currentItem.phone3].join(' ')
        formattedList.push([name, address, cname, phones])
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <ScrollView>
                    {formattedList.map((item, index) => (
                        <View style={styles.container} key={index}>
                            <View>
                                <Text style={{ fontWeight: 'bold', color: '#660033' }}>{item[0]}</Text>
                                <Text style={{ fontWeight: 'bold' }}>{item[2]}</Text>
                            </View>
                            <View>
                                <Text>{'\n'}Address: {'\n'}{item[1]}</Text>
                                <Text>{'\n'}Tel: {item[3]}</Text>
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

export default KeyContacts