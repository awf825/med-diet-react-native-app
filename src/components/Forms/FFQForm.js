import React, { useContext } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    StatusBar,
    Text,
    Button,
    View,
    Input
} from 'react-native';
import { Formik, useFormik } from 'formik';
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
    const { userToken, logout } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: getDynamicFormValues(questions),
        onSubmit: values => _handleSubmit(values)
    });

    console.log('formik.values', formik.values)

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
                                            value={String(qao.option_id)}
                                            color="blue"
                                        />
                                        <Text>{qao.option_text}</Text>
                                    </View>
                                })
                            }
                        </RadioButton.Group>
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