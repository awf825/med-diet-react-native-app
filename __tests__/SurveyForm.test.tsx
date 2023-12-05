import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import React from 'react'

import {
    jest,
    test,
    expect
} from "@jest/globals"
import { ReactTestInstance } from 'react-test-renderer';
import SurveyForm from '../src/components/Forms/SurveyForm';
import { AuthProvider } from '../src/context/AuthContext';
import LoginScreen from '../src/screens/LoginScreen';

const mockQuestions = [
    { question_id: 1, field_code: "test1", field_type: "INT", question_text: "TEST QUESTION 1?" },
    { question_id: 2, field_code: "test2", field_type: "INT", question_text: "TEST QUESTION 2?" },
    { question_id: 3, field_code: "test3", field_type: "TEXT", question_text: "TEST QUESTION 3?" },
]

beforeEach(async () => {
    const { getByTestId } = render(<AuthProvider><LoginScreen navigation={undefined} /></AuthProvider>)
    await waitFor(
        () => {
            const loginButton = getByTestId("LOGIN");
            const emailField = getByTestId("EMAIL");
            const passwordField = getByTestId("PASSWORD");
            expect(emailField).toBeDefined;
            expect(passwordField).toBeDefined;
            expect(loginButton).toBeDefined;
            fireEvent(emailField, "onChangeText", "awf825");
            fireEvent(passwordField, "onChangeText", "password");
            fireEvent(loginButton, "onPress");
        }
    );  

})

test('rendering and submitting mock Formik form', async () => {
    const _handleSubmit = jest.fn();
    render(<SurveyForm questions={mockQuestions} _handleSubmit={_handleSubmit}/>)

    const button = screen.getByTestId("SUBMIT");
    const user = userEvent.setup();

    await waitFor(
        () => {
            let picker: ReactTestInstance;
            for (let i = 0; i < mockQuestions.length; i++) {
                picker = screen.getByTestId(`form-item-${i}`).children[1] as ReactTestInstance;
                if (mockQuestions[i].field_type == "INT") {
                    fireEvent(picker, 'onValueChange', 25);
                    expect(picker.props.selectedValue).toBe(25);
                } else {
                    fireEvent(picker, 'onValueChange', "No");
                    expect(picker.props.selectedValue).toBe("No");
                }
            }
        }
    );

    await user.press(button);
    expect(_handleSubmit).toHaveBeenCalledWith({
        test1: 25,
        test2: 25,
        test3: "No"
    });
})

function beforeEach(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}
