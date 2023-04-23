import React, { useEffect, useState } from 'react';
import "../ignoreWarnings";
import PouchDB from 'pouchdb-react-native';
import RenderHTML from 'react-native-render-html';
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

const Tips = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { width } = useWindowDimensions();
    const [tipList, setList] = useState([])

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 2, include_docs: true, descending: true, })
            .then((result) => {
                const firstDoc = result.rows[1].doc;
                const tipObj = firstDoc.data.tips
                setList(Object.keys(tipObj).map(key => tipObj[key]))
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("contactskey error", err);
            });
    }, []);

    let formattedList = []
    for (let i = 0; i < tipList.length; i++) {
        const currentItem = tipList[i]
        currentItem.lettertext = currentItem.lettertext.replace(/<font(.*?)>/gi, '<p$1>').replace(/<\/font>/gi, '</p>');
        currentItem.headline = currentItem.headline.replace(/<font(.*?)>/gi, '<p$1>').replace(/<\/font>/gi, '</p>');
        formattedList.push(currentItem.headline)
        formattedList.push(currentItem.lettertext)
    }
 
    return (
        <React.Fragment>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <ScrollView>
                    {formattedList.map((item, index) => (
                        <View>
                            <RenderHTML source={{ html: item }} contentWidth={width} />
                        </View>
                    ))}
                </ScrollView>
            )}
        </React.Fragment>
    )

}

export default Tips