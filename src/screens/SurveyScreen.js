import React, { useEffect, useState, useContext } from 'react';
import {
  Text,
} from 'react-native';
import SurveyForm from '../components/Forms/SurveyForm';
import { AuthContext } from '../context/AuthContext';
import AuthAxios from '../services/AuthAxios';

const SurveyScreen = ({ navigation }) => {
    const { userToken } = useContext(AuthContext)
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        AuthAxios(userToken).get("/api/questions/")
        .then(resp => {
            setQuestions(resp.data)
        })
        .catch(err => console.log(err))
    }, [])

    const _handleSubmit = (values) => {
        AuthAxios(userToken).post(
            "/api/submissions/submit",
            questions.map((q) => {
                return {
                    ...q,
                    answer_score: values[q.field_code]
                }
            })
        )
        .then(resp => {
            if (resp.data.success) {
                navigation.navigate('Dashboard')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        questions.length > 0 
        ?
        <SurveyForm questions={questions} _handleSubmit={_handleSubmit}/>
        :
        <Text>LOADING</Text>
    );
};

export default SurveyScreen;