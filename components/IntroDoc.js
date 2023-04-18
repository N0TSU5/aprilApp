import React, { useEffect, useState } from 'react';
import "../ignoreWarnings";
import PouchDB from 'pouchdb-react-native';
import LoadingScreen from './LoadingScreen';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import {
    StyleSheet,
    ScrollView
} from "react-native";

const IntroDoc = () => {

    const [scale, setScale] = useState(1);

    const handleZoomIn = () => {
        setScale(scale => scale + 0.1);
    };

    const handleZoomOut = () => {
        setScale(scale => Math.max(scale - 0.1, 0.5));
    };

    const { width } = useWindowDimensions();
    const [letter, setLetter] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true })
            .then((result) => {
                const firstDoc = result.rows[0].doc;
                setLetter((firstDoc.data.letter));
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("tphome error", err);
            });
    }, []);

    return (
        <React.Fragment>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <ScrollView
                    maximumZoomScale={2}
                    minimumZoomScale={0.8}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <RenderHTML source={{ html: letter }} tagsStyles={markupStyles} contentWidth={width} />
                </ScrollView>
            )}
        </React.Fragment>
    )
}

const markupStyles = StyleSheet.create({
    p: {
        fontSize: 20,
        color: '#333',
        lineHeight: 25,
        marginVertical: 10,
        marginLeft: 12
    },
    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 20,
    },
});

export default IntroDoc