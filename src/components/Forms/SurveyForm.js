import React from 'react';
import {
    SafeAreaView,
    FlatList,
    Button,
    Text
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RadioButtonGroup } from './RadioButtonGroup/RadioButtonGroup';
import { FormsDatePicker } from './FormsDatePicker/FormsDatePicker';
import { FormsSelector } from './FormsSelector/FormsSelector';

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

const SurveyForm = ({ questions, _handleSubmit }) => {
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

    const _renderItem = ({ item, index }) => {
        switch (item.question_field_type.field_name) {
            case "FFQ-FREQ-A":
            case "FFQ-FREQ-B":
            case "FFQ-FREQ-C":
            case "WKLY-QTY":
            case "WKLY-FREQ":
                return <RadioButtonGroup
                    formik={formik}
                    label={item.question_text}
                    options={item.question_field_type.question_answer_options}
                    fieldCode={item.field_code}
                />
            case "GENDER":
                return <RadioButtonGroup
                    formik={formik}
                    label={item.question_text}
                    options={item.question_field_type.question_answer_options}
                    fieldCode={item.field_code}
                    isStringValue={true}
                />
            case "DOB":
                return <FormsDatePicker
                    formik={formik}
                    label={item.question_text}
                    fieldCode={item.field_code}
                />
            case "SELECT-ORIGIN": // Perhaps regex for "select-xxx"
                return <FormsSelector
                    formik={formik}
                    label={item.question_text}
                    options={item.question_field_type.question_answer_options}
                    fieldCode={item.field_code}
                />
            default:
                return <Text>DEFAULT</Text> // please change
        }
    }

    return (
        <SafeAreaView
            style={{ 
                justifyContent:'center',
                alignContent:'center',
            }}
        >
            <FlatList
                data={questions}
                renderItem={_renderItem}
                keyExtractor={item => item.question_id}
            />
            <Button
                // disabled={!formik.isValid}
                // disabled={
                //     // Object.values(formik.touched) < 1 && 
                //     // Object.keys(formik.errors).length > 0
                // }
                testID={"SUBMIT"}
                onPress={formik.handleSubmit}
                title="DONE"
                name="submit"
            />
        </SafeAreaView>
    )
}

export default SurveyForm;