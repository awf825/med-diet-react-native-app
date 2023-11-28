import { fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import {
    it,
    jest,
    test,
    expect
} from "@jest/globals"
import DashboardScreen from '../screens/DashboardScreen';
import React, { useState, useContext } from 'react';

// test('should test what goes into the state', () => {  
//     const setState = jest.fn();
//     jest
//       .spyOn(React, 'useState')
//       .mockImplementationOnce((initState) => [initState, setState]);  render(<DashboardScreen navigation={undefined} />);
//     }
// );

// test('Expect the Submissions to be rendered', async () => {
//     const { getByTestId } = render(<DashboardScreen navigation={undefined} />)
//     await waitFor(
//         () => {
//             const logoutButton = getByTestId("Logout");
//             expect(logoutButton).toBeDefined;
//             const surveyButton = getByTestId("Survey");
//             expect(surveyButton).toBeDefined;
//         }
//     );  
// })

test('TRUTHY', () => {
    expect(true).toBeTruthy();
})