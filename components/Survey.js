import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingScreen from './LoadingScreen';

const Survey = () => {
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [orderID, setOrder] = useState('');

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('@order_id');
            const response = await fetch('http://137.205.157.163:4375/api/bookings', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const jsonData = await response.json();
            const order_id = jsonData[0].tems_order_id;
            setOrder(order_id);

            const feedbackResponse = await fetch(`http://137.205.157.163:4375/api/feedback/${order_id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const responseData = await feedbackResponse.json();
            const formattedQuestions = responseData.questions.map((question) => ({
                question: question.question,
                feedbackresponseline_id: question.feedbackresponseline_id,
                response_type: question.response_type,
                response: question.response,
            }));
            setQuestions(formattedQuestions);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleAnswer = useCallback((response, feedbackresponseline_id) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [feedbackresponseline_id]: response,
        }));
        console.log(prevAnswers)
    }, []);

    const handleOnSubmit = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('@order_id');
            const formattedList = Object.entries(answers).map(([feedbackresponseline_id, response]) => ({
                feedbackresponseline_id,
                response,
            }));
            const payload = {
                tems_feedbackresponse_id: orderID,
                questions: formattedList,
            };
            const response = await fetch('http://137.205.157.163:4375/api/booking', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }
        } catch (error) {
            console.log(error);
        }
    }, [answers, orderID]);

    const renderQuestion = ({ item }) => (
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>
            {item.response_type === 'S' && renderOption('Excellent', '4', item.feedbackresponseline_id)}
            {item.response_type === 'S' && renderOption('Very Good', '3', item.feedbackresponseline_id)}
            {item.response_type === 'S' && renderOption('Good', '2', item.feedbackresponseline_id)}
            {item.response_type === 'S' && renderOption('Satisfactory', '1', item.feedbackresponseline_id)}
            {item.response_type === 'S' && renderOption('Poor', '0', item.feedbackresponseline_id)}

            {item.response_type === 'I' && renderOption('Essential', '4', item.feedbackresponseline_id)}
            {item.response_type === 'I' && renderOption('Very Important', '3', item.feedbackresponseline_id)}
            {item.response_type === 'I' && renderOption('Important', '2', item.feedbackresponseline_id)}
            {item.response_type === 'I' && renderOption('Desirable', '1', item.feedbackresponseline_id)}
            {item.response_type === 'I' && renderOption('Passable', '0', item.feedbackresponseline_id)}

            {item.response_type === 'Y' && renderOption('Yes', 'Y', item.feedbackresponseline_id)}
            {item.response_type === 'Y' && renderOption('No', 'N', item.feedbackresponseline_id)}

            {item.response_type === 'C' && renderOption('Yes', 'Y', item.feedbackresponseline_id)}
            {item.response_type === 'C' && renderOption('No', 'N', item.feedbackresponseline_id)}
            {item.response_type === 'C' && renderOption('Please check', 'C', item.feedbackresponseline_id)}

            {item.response_type === 'M' && renderOption('Yes', 'Y', item.feedbackresponseline_id)}
            {item.response_type === 'M' && renderOption('Maybe', 'M', item.feedbackresponseline_id)}
            {item.response_type === 'M' && renderOption('No', 'N', item.feedbackresponseline_id)}

            {item.response_type === 'T' && (
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your text here"
                    onChangeText={(text) => handleAnswer(text, item.feedbackresponseline_id)}
                    value={answers[item.feedbackresponseline_id] || ''}
                />
            )}
        </View>
    );

    const renderOption = (label, value, feedbackresponseline_id) => (
        <TouchableOpacity onPress={() => handleAnswer(value, feedbackresponseline_id)}>
            <View style={styles.optionContainer}>
                <Text style={[styles.optionText, answers[feedbackresponseline_id] === value && { color: 'blue', fontWeight: 'bold' }]}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <FlatList
                    data={questions}
                    renderItem={renderQuestion}
                    keyExtractor={(item) => item.feedbackresponseline_id}
                />
            )}
            <TouchableOpacity onPress={handleOnSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40, // Added padding top to create space for the header
    },
    questionContainer: {
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // Updated text color for the question
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 20, // Increased spacing between options
    },
    optionText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333', // Updated text color for the options
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc', // Updated border color for the text input
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
        color: '#333', // Updated text color for the input text
    },
    submitButton: {
        backgroundColor: '#007BFF', // Changed the submit button color
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        marginVertical: '22%',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20, // Added marginTop to show the submit button
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Survey;
