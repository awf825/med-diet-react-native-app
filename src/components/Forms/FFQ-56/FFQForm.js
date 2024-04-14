import React, {memo, useCallback, PureComponent} from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    Button,
    Text
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import RadioButtonGroup from '../controls/RadioButtonGroup/RadioButtonGroup';
import FormsDatePicker from '../controls/FormsDatePicker/FormsDatePicker';
import FormsSelector from '../controls/FormsSelector/FormsSelector';
import _questions from './questions.json'
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

// MAY BE BETTER: https://react-hook-form.com/get-started#Registerfields

// const _getItem = ({ item, index, formik }) => {
//     switch (item.question_field_type.field_name) {
//         case "FFQ-FREQ-A":
//             return <RadioButtonGroup
//                 formik={formik}
//                 label={item.question_text}
//                 options={_options}
//                 fieldCode={item.field_code}
//             />
//         case "GENDER":
//             return <RadioButtonGroup
//                 formik={formik}
//                 label={item.question_text}
//                 options={item.question_field_type.question_answer_options}
//                 fieldCode={item.field_code}
//                 isStringValue={true}
//             />
//         case "DOB":
//             console.log('HIT DOB CASE')
//             return <FormsDatePicker
//                 formik={formik}
//                 label={item.question_text}
//                 fieldCode={item.field_code}
//             />
//         case "SELECT-ORIGIN": // Perhaps regex for "select-xxx"
//             return <FormsSelector
//                 formik={formik}
//                 label={item.question_text}
//                 options={item.question_field_type.question_answer_options.map((opt, i) => {
//                     return {
//                         key: i+1,
//                         label: opt
//                     }
//                 })}
//                 fieldCode={item.field_code}
//             />
//         default:
//             return <Text>DEFAULT</Text> // please change
//     }
// }

// class RenderedItem extends PureComponent {
//     render() {
//       const {item, index, formik} = this.props;
//       return (
//         <View>
//           {console.log('rendering', index)}
//           {
//             _getItem({ item, index, formik })
//           }
//         </View>
//       );
//     }
// }

class RenderedItem extends PureComponent {
    render() {
      const {item, index} = this.props;
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

const FFQForm = ({ questions, _handleSubmit }) => {  
    // const keyExtractor = useCallback((item) => {item => item.question_id},[])

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
        onSubmit: values => {
            _handleSubmit(values)
        }
    });

    const _getItem = ({ item, index }) => {
        switch (item.question_field_type.field_name) {
            case "FFQ-FREQ-A":
                return <RadioButtonGroup
                    formik={formik}
                    label={item.question_text}
                    options={_options}
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
                console.log('HIT DOB CASE')
                return <FormsDatePicker
                    formik={formik}
                    label={item.question_text}
                    fieldCode={item.field_code}
                />
            case "SELECT-ORIGIN": // Perhaps regex for "select-xxx"
                return <FormsSelector
                    formik={formik}
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
          const {item, index} = this.props;
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

    const _renderItem = useCallback(({ item, index, formik }) => (
        <RenderedItem item={item} index={index} formik={formik} />
    ), [])

    return (
        <>
            <FlatList
                data={questions}
                renderItem={_renderItem}
                // onEndReached={() => this.nextItemsTest()}
                // onEndReachedThreshold={0.2}
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
        </>
    )
}

export default memo(FFQForm);