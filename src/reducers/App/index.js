import { useReducer } from 'react';
import { buildTheme, randomTheme } from '../../themes';
import AppReducer from './reducer';

export const initialState = {
  weatherData: [],
  containerStyle: {},
  image: {
    urls: {},
    user: {},
  },
  bgStyle: {},
};

const randomizedTheme = randomTheme();

export const withThemeInitialState = {
  ...initialState,
  currentTheme: randomizedTheme,
  theme: buildTheme(randomizedTheme),
};

export default function useAppReducer(options = withThemeInitialState) {
  return useReducer(AppReducer, options);
}
