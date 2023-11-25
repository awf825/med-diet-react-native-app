import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Text,
} from 'react-native';
import { BASE_URL } from '../config';
import SurveyForm from '../components/Forms/SurveyForm';

const SurveyScreen = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/questions/`)
        .then(resp => {
            setQuestions(resp.data)
        })
        .catch(err => console.log(err))
    }, [])

    const _handleSubmit = (values) => {
        axios.post(
        `${BASE_URL}/api/submissions/submit`,
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