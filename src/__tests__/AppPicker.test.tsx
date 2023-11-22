import { render, screen } from '@testing-library/react-native';
import SurveyScreen from "../screens/SurveyScreen";
import AppPicker from '../components/AppPicker/AppPicker';

import {
  expect
} from "@jest/globals"

test('Testing App Picker', () => {
    render(<AppPicker options={[{option: 'opt', value: 'val'}]} label={"Label"}/>)
    const picker = screen.getByText("Label");
    expect(picker).toBeDefined;
})