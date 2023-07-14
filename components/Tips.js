import React, { useEffect, useState } from 'react';
import "../ignoreWarnings";
import LoadingScreen from './LoadingScreen';
import PouchDB from 'pouchdb-react-native';
import RenderHTML from 'react-native-render-html';
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

    const [tips, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const db = new PouchDB('userDB');
        db.allDocs({ limit: 1, include_docs: true, descending: false, })
            .then((result) => {
                const firstDoc = result.rows[0].doc;
                const tipsObj = firstDoc.data.tips
                setList(Object.keys(tipsObj).map(key => tipsObj[key]))
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("tips error", err);
            });
    }, []);

    for (let i = 0; i < tips.length; i++) {
        if (tips[i].section == null) {
            tips[i].section = "";
        }
        tips[i].section = tips[i].section.replace(/"/g, '\'');
        tips[i].lettertext = tips[i].lettertext.replace(/"/g, '\'');
        tips[i].lettertext = tips[i].lettertext.replace(/\n|\r/g, '');
        tips[i].lettertext = tips[i].lettertext.replace(/\s\s+/g, ' ');
        tips[i].lettertext = tips[i].lettertext.replace(/<font.*?>/gi, "").replace(/<\/font>/gi, "");
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <ScrollView
                    maximumZoomScale={2}
                    minimumZoomScale={1}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {tips.map((item, index) => (
                        <View style={styles.container} key={index}>
                            <Text style={styles.title}>{item.section}</Text>
                            <WebDisplay html={item.lettertext} />
                        </View>
                    ))}
                </ScrollView>
            )}
        </React.Fragment>
    )
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

export default Tips;

