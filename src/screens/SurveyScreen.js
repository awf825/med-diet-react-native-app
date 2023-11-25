import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  Button,
  View
} from 'react-native';
import { BASE_URL } from '../config';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

let numberOptions = [];
for (let i = 0; i <= 30; i++) {
    numberOptions.push({
        label: String(i),
        value: i
    })
}

let radioOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 }
]

const getDynamicFormValues = (data) => {    
    return data.reduce(
        (prev, curr) => { 
            return Object.assign(
                prev, 
                { 
                    [curr.field_code]: curr.field_type==="INT" ? 0 : 
                    curr.field_type==="TEXT" ? 1 :
                    null
                }
            ) 
        }, 
        {}
    );
}

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
            questions.map(q => {
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
        questions.length > 0 ?
        <Formik
            initialValues={getDynamicFormValues(questions)}
            onSubmit={values => _handleSubmit(values)}
        >
            {
                ({ setFieldValue, handleSubmit, values }) => (
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={questions}
                            renderItem={({item, index}) => (
                                <View testID={`form-item-${index}`} style={styles.item}>
                                    <Text>{item.question_text}</Text>
                                    <Picker
                                        selectedValue={values[item.field_code]}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setFieldValue(item.field_code, itemValue)
                                        }}>
                                        {
                                            (item.field_type === "INT" ? numberOptions : radioOptions).map(option => {
                                                return <Picker.Item key={option.value} label={option.label} value={option.value} />
                                            })
                                        }
                                    </Picker>
                                </View>
                            )}
                            keyExtractor={item => item.question_id}
                        />
                        <Button onPress={handleSubmit} title="DONE"/>
                    </SafeAreaView>
                )
            }
        </Formik> :
        <Text>LOADING</Text>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default SurveyScreen;