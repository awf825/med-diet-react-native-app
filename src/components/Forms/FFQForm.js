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
import { Formik } from 'formik';
import CustomButton from '../CustomButton/CustomButton';
import { AuthContext } from '../../context/AuthContext';

const getDynamicFormValues = (questions) => {
    // TODO reapply field_code to database
    return questions.reduce(
        (prev, curr) => {
            return Object.assign(
                prev,
                {
                    [curr.question_id]: ""
                }
            )
        },
        {}
    );
} 

const FFQForm = ({ questions, _handleSubmit }) => {
    const { userToken, logout } = useContext(AuthContext)
    return (
        <Formik
            testID="SURVEY-FORM"
            initialValues={getDynamicFormValues(questions)}
            onSubmit={values => _handleSubmit(values)}
        >
            {
                ({ setFieldValue, handleSubmit, values }) => (
                    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <FlatList
                            data={questions}
                            renderItem={({ item, index }) => (
                                <View testID={`form-item-${index}`} style={styles.item}>
                                    <Text>{item.question_text}</Text>
                                    <FlatList
                                        columnWrapperStyle={{justifyContent: 'space-between'}}
                                        data={item.question_field_type.question_answer_options}
                                        numColumns={2}
                                        renderItem={({ item, _index }) => (
                                            <View style={{width: '45%'}}>
                                                <Text>{item.option_text}</Text>
                                                {/* https://stackoverflow.com/questions/62726670/how-to-work-with-multiple-groups-of-radio-buttons-in-formik */}
                                                {/* <Input
                                                    type="radio"
                                                    id={item.option_id}
                                                    className="form-check-input"
                                                    name={`values[${_index+1}]`}
                                                    value={item.option_id}
                                                    checked={
                                                        values && values[_index+1]
                                                        ? values[_index+1] === item.option_id
                                                        : false
                                                    }
                                                    onChange={() => setFieldValue(values[_index+1], item.option_id)}
                                                    // onBlur={handleBlur}
                                                /> */}
                                            </View>
                                            // <Picker
                                            //     selectedValue={values[item.field_code]}
                                            //     onValueChange={(itemValue, itemIndex) => {
                                            //         setFieldValue(item.field_code, itemValue)
                                            //     }}>
                                                    
                                            // </Picker>
                                        )}
                                        keyExtractor={item => item.option_id}
                                    />
                                </View>
                            )}
                            keyExtractor={item => item.question_id}
                        />
                        <Button
                            testID={"SUBMIT"}
                            onPress={handleSubmit}
                            title="DONE"
                            name="submit"
                        />
                        <CustomButton label={"Logout"} onPress={logout} />
                    </SafeAreaView>
                    // <SafeAreaView style={styles.container}>
                    //     <FlatList
                    //         data={questions}
                    //         renderItem={({ item, index }) => (
                    //             <View testID={`form-item-${index}`} style={styles.item}>
                    //                 <Text>{item.question_text}</Text>
                    //                 <Picker
                    //                     selectedValue={values[item.field_code]}
                    //                     onValueChange={(itemValue, itemIndex) => {
                    //                         setFieldValue(item.field_code, itemValue)
                    //                     }}>
                    //                     {
                    //                         (item.field_type === "INT" ? numberOptions : radioOptions).map(option => {
                    //                             return <Picker.Item key={option.value} label={option.label} value={option.value} />
                    //                         })
                    //                     }
                    //                 </Picker>
                    //             </View>
                    //         )}
                    //         keyExtractor={item => item.question_id}
                    //     />
                    //     <Button
                    //         testID={"SUBMIT"}
                    //         onPress={handleSubmit}
                    //         title="DONE"
                    //         name="submit"
                    //     />
                    // </SafeAreaView>
                )
            }
        </Formik>
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