import React, { useContext } from 'react';
import {
    SafeAreaView,
    FlatList,
    Button
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../CustomButton/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import { RadioButtonGroup } from './RadioButtonGroup/RadioButtonGroup';

const getDynamicFormValues = (questions) => {
    return questions.reduce(
        (prev, curr) => {
            return Object.assign(
                prev,
                {
                    [curr.field_code]: ""
                }
            )
        },
        {}
    );
}

const FFQForm = ({ questions, _handleSubmit }) => {
    const { logout } = useContext(AuthContext)
    
    const formik = useFormik({
        initialValues: getDynamicFormValues(questions),
        validationSchema: yup.object().shape(
            questions.reduce(
                (prev, curr) => {
                    return Object.assign(
                        prev,
                        {
                            [curr.field_code]: yup.string().min(1).required("All fields are required.")
                        }
                    )
                },
                {}
            )
        ),
        validateOnChange: false,
        onSubmit: values => _handleSubmit(values)
    });

    return (
        <SafeAreaView 
            style={{ 
                justifyContent:'center',
                alignContent:'center', 
            }} 
        >
            <FlatList
                data={questions}
                renderItem={({ item, index }) => (
                    <RadioButtonGroup
                        formik={formik}
                        label={item.question_text}
                        options={item.question_field_type.question_answer_options}
                        fieldCode={item.field_code}
                    />
                )}
                keyExtractor={item => item.question_id}
            />
            <Button
                disabled
                testID={"SUBMIT"}
                onPress={formik.handleSubmit}
                title="DONE"
                name="submit"
            />
            <CustomButton 
                label={"Logout"} 
                onPress={logout} 
            />
        </SafeAreaView>
    )
}

export default FFQForm;