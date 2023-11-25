import { fireEvent, render, waitFor } from '@testing-library/react-native';
import SurveyScreen from '../screens/SurveyScreen';

import {
    test,
    expect
} from "@jest/globals"
import { ReactTestInstance } from 'react-test-renderer';

test('Can make a selection in the picker', async () => {
  const { getByTestId } = render(<SurveyScreen navigation={undefined} />)
  await waitFor(
    () => {
        const picker = getByTestId("form-item-1").children[1] as ReactTestInstance;
        fireEvent(picker, 'onValueChange', 27);
        expect(picker.props.selectedValue).toBe(27);
    }
);
})
