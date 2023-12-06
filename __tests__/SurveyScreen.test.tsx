import { fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import React from 'react'
import SurveyScreen from '../src/screens/SurveyScreen';
import LoginScreen from '../src/screens/LoginScreen';

import {
    it,
    jest,
    test,
    expect,
    beforeEach,
    describe
} from "@jest/globals"
import { AuthProvider } from '../src/context/AuthContext';

beforeEach(() => {
    const { getByTestId } = render(<AuthProvider><LoginScreen navigation={undefined} /></AuthProvider>)
    const loginButton = getByTestId("LOGIN");
    const emailField = getByTestId("EMAIL");
    const passwordField = getByTestId("PASSWORD");
    expect(emailField).toBeDefined;
    expect(passwordField).toBeDefined;
    expect(loginButton).toBeDefined;
    fireEvent(emailField, "onChangeText", "awf825");
    fireEvent(passwordField, "onChangeText", "password");
    fireEvent(loginButton, "onPress");
})

test('SurveyForm', async () => {
    const { getByTestId } = render(<AuthProvider><SurveyScreen navigation={undefined} /></AuthProvider>)
    await waitFor(
        () => {
            const submitButton = getByTestId("SUBMIT");
            expect(submitButton).toBeDefined;
        }
    );  
})