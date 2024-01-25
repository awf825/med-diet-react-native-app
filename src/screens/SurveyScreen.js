import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import SurveyForm from '../components/Forms/SurveyForm';
import { AuthContext } from '../context/AuthContext';
import AuthAxios from '../services/AuthAxios';

const SurveyScreen = ({ navigation }) => {
    const { userToken } = useContext(AuthContext)
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        AuthAxios(userToken).get("/api/questions/weekly")
        .then(resp => {
            setQuestions(resp.data)
            setIsLoading(false);
        })
        .catch(err => console.log(err))

        return () => {
            setIsLoading(false);
        }
    }, [])

    const _handleSubmit = (values) => {
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
        <SurveyForm questions={questions} _handleSubmit={_handleSubmit}/>
    );
};

export default SurveyScreen;