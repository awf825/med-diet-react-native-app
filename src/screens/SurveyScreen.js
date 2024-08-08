import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import SurveyForm from '../components/Forms/D-25/SurveyForm';
import { AuthContext } from '../context/AuthContext';
import AuthAxios from '../services/AuthAxios';

const SurveyScreen = ({ navigation }) => {
    const { userToken } = useContext(AuthContext)
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            setIsLoading(true)
            AuthAxios(userToken).get("/api/questions/weekly")
            .then(resp => {
                console.log('resp.data: ', resp.data)
                setQuestions(resp.data)
                setIsLoading(false);
            })
            .catch(err => console.log(err))
        });

        return () => {
            setIsLoading(false);
        }
    }, [navigation]);


    const _handleSubmit = (values) => {
        console.log('values: ', values)
        console.log('questions: ', questions)
        AuthAxios(userToken).post(
            "/api/submissions/submit",
            {
                form_id: 2,
                answers: questions.map((q) => {
                    return {
                        ...q,
                        answer_score: Number(values[q.field_code])
                    }
                })
            }
        )
        .then(async resp => {
            if (resp.data.success) {
                navigation.navigate('Dashboard')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        isLoading
        ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator size={'large'}/>
        </View>
        :
        <SurveyForm _handleSubmit={_handleSubmit} questions={questions}/>
    );
};

export default SurveyScreen;