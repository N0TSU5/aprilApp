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

const Itinenary = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { width } = useWindowDimensions();
    const [itinerary, setList] = useState([])

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true })
            .then((result) => {
                const firstDoc = result.rows[0].doc;
                const itineraryObj = firstDoc.data.itinerary
                setList(Object.keys(itineraryObj).map(key => itineraryObj[key]))
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("tphome error", err);
            });
    }, []);

    const groupedItinerary = [];
    if (itinerary.length > 0) {
        let currentGroup = [itinerary[0]];
        let currentDate = new Date(itinerary[0].datestart);

        for (let i = 1; i < itinerary.length; i++) {
            const item = itinerary[i];
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
        const itemDate = moment(currentItem[0].datestart).format('dddd D MMMM')
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

    return (
        <React.Fragment>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <ScrollView>
                    {formattedList.map((item, index) => (
                        <View style={styles.container} key={index}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.title}>Day {item[0]} {item[1]} |</Text>
                                <RenderHTML source={{ html: item[2] }} baseStyle={styles.title} contentWidth={width} />
                            </View>
                            <WebDisplay html={item[3]} />
                            <WebDisplay html={item[3]} />
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
    }
});

export default Itinenary