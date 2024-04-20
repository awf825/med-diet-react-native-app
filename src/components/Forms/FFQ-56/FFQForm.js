import React, { memo, useCallback, PureComponent } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    Button,
    Text,
    StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioButtonGroup from '../controls/RadioButtonGroup/RadioButtonGroup';
import FormsDatePicker from '../controls/FormsDatePicker/FormsDatePicker';
import FormsSelector from '../controls/FormsSelector/FormsSelector';
import _options from './options.json'

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
    const _getItem = ({ item, index }) => {
        switch (item.question_field_type.field_name) {
            case "FFQ-FREQ-A":
                return <RadioButtonGroup
                    label={item.question_text}
                    options={_options}
                    fieldCode={item.field_code}
                />
            case "GENDER":
                return <RadioButtonGroup
                    label={item.question_text}
                    options={item.question_field_type.question_answer_options}
                    fieldCode={item.field_code}
                    isStringValue={true}
                />
            case "DOB":
                console.log('HIT DOB CASE')
                return <FormsDatePicker
                    label={item.question_text}
                    fieldCode={item.field_code}
                />
            case "SELECT-ORIGIN": // Perhaps regex for "select-xxx"
                return <FormsSelector
                    label={item.question_text}
                    options={item.question_field_type.question_answer_options.map((opt, i) => {
                        return {
                            key: i+1,
                            label: opt
                        }
                    })}
                    fieldCode={item.field_code}
                />
            default:
                return <Text>DEFAULT</Text> // please change
        }
    }

    class RenderedItem extends PureComponent {
        render() {
            const { item, index } = this.props;
            return (
                <View>
                    {console.log('rendering', index)}
                    {
                        _getItem({ item, index })
                    }
                </View>
            );
        }
    }

    const _renderItem = useCallback(({ item, index }) => (
        <RenderedItem item={item} index={index} />
    ), [])

    return (
            <Formik
                initialValues={getDynamicFormValues(questions)}
                validationSchema={yup.object().shape(
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
                )}
                validateOnChange={false}
                onSubmit={(values) => {
                    _handleSubmit(values)
                }}
            >
                {
                    props => (
                        <SafeAreaView style={styles.main}>
                            <FlatList
                                data={questions}
                                renderItem={_renderItem}
                                keyExtractor={item => item.question_id}
                            />
                            <Button
                                testID={"SUBMIT"}
                                onPress={props.handleSubmit}
                                title="DONE"
                                name="submit"
                            />
                        </SafeAreaView>
                    )
                }
            </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 50
    },
    main: {
     flex: 1   
    }
  });

export default memo(FFQForm);