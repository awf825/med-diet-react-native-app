import React, { useContext } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    StatusBar,
    Text,
    Button,
    View,
} from 'react-native';
import { useFormik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import CustomButton from '../CustomButton/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import { RadioButton } from 'react-native-paper';


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
        <SafeAreaView style={{ justifyContent:'center',alignContent:'center', flex:1}} >
            <FlatList
                data={questions}
                renderItem={({ item, index }) => (
                    <>
                        <Text>{item.question_text}</Text>
                        <RadioButton.Group
                            onValueChange={formik.handleChange(item.field_code)}
                            value={formik.values[item.field_code]}
                        >
                            {
                                item.question_field_type.question_answer_options.map((qao, i) => {
                                    return <View key={i+1} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton.Android
                                            value={String(qao.ordering)} // using ordering here as it makes logical sense for 'score' at the moment
                                            color="blue"
                                        />
                                        <Text>{qao.option_text}</Text>
                                    </View>
                                })
                            }
                        </RadioButton.Group>
                        {
                            formik.errors[item.field_code] && 
                            <Text style={{color: "red"}}>{formik.errors[item.field_code]}</Text>
                        }
                    </>
                )}
                keyExtractor={item => item.question_id}
            />
            <Button
                testID={"SUBMIT"}
                onPress={formik.handleSubmit}
                title="DONE"
                name="submit"
            />
            <CustomButton label={"Logout"} onPress={logout} />
        </SafeAreaView>
    )
}

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

export default FFQForm;