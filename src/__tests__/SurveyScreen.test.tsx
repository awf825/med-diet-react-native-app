import { fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import React from 'react'
import SurveyScreen from '../screens/SurveyScreen';

import {
    it,
    jest,
    test,
    expect
} from "@jest/globals"

test('Expect the Survey Form to be rendered', async () => {
    const { getByTestId } = render(<SurveyScreen navigation={undefined} />)
    await waitFor(
        () => {
            const submitButton = getByTestId("SUBMIT");
            expect(submitButton).toBeDefined;
        }
    );  
})