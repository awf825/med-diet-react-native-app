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
import RadioButtonPair from '../controls/RadioButtonPair/RadioButtonPair';

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

const SurveyForm = ({ _handleSubmit, questions }) => {
    class RenderedItem extends PureComponent {
        render() {
            const { item, index } = this.props;
            return (
                <View>
                    <RadioButtonPair
                        label={item.question_text}
                        options={item.question_field_type.question_answer_options}
                        fieldCode={item.field_code}
                        positiveImpact={item.positive_impact>0 ? true : false}
                    />
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

export default memo(SurveyForm);