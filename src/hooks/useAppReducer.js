import { useReducer } from 'react';
import { buildTheme, randomTheme } from '../themes';
import { AppReducer } from '../reducers';

const initialState = {
  weatherData: [],
  containerStyle: {},
  image: {
    urls: {},
    user: {},
  },
  bgStyle: {},
};

const currentTheme = randomTheme();
const [theme, highlightName] = buildTheme(currentTheme)

const withThemeInitialState = {
  ...initialState,
  currentTheme,
  highlightName,
  theme,
};

export default function useAppReducer(options = withThemeInitialState) {
  return useReducer(AppReducer, options);
}
