import { useEffect, useReducer, useCallback } from 'react';
import './App.css';
import WeatherGrid from './components/WeatherGrid/WeatherGrid';
import Query from './components/Query/Query';
import { AppReducer } from './reducers';
import useGetRandomPic from './hooks/useRandomPic';
import { buildTheme } from './themes/colorPalette';
import { LIGHT } from './themes/constants';
import { ThemeProvider } from 'styled-components';
import Background from './components/Background/Background';
import GlobalStyles from './globalStyles';

const initialState = {
  weatherData: [],
  containerStyle: {},
  currentTheme: LIGHT,
  image: {
    urls: {},
    user: {},
  },
  bgStyle: {},
};

const withThemeInitialState = {
  ...initialState,
  theme: buildTheme(initialState.currentTheme),
};

function App() {
  console.log('rendering app...');

  const [
    { weatherData, containerStyle, image, bgStyle, theme, currentTheme },
    dispatch,
  ] = useReducer(AppReducer, withThemeInitialState);

  // may consider have a data variable from useGetRandomPic for ease of testing
  const { isError, error } = useGetRandomPic({ dispatch, currentTheme });

  const updateWeatherData = useCallback((payload) => {
    dispatch({ type: 'updateWeatherData', payload });
  }, []);

  useEffect(() => {
    // console.log('inside useEffect dispatch updateContainerStyle', weatherData);
    weatherData.length <= 1 && dispatch({ type: 'updateContainerStyle' });
  }, [weatherData.length]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Background style={bgStyle}>
          <div className="container" style={containerStyle}>
            <div className="heading">
              <div>The weather in</div>
              <div>
                <Query updateWeatherData={updateWeatherData} />
              </div>
              <div>is like?</div>
            </div>
            {weatherData.length > 0 && (
              <WeatherGrid weatherData={weatherData} />
            )}
          </div>
          <div className="credits">
            {isError && <span>{error.message}</span>}
            {Object.keys(image.urls).length > 0 && (
              <>
                <span>BG photo by </span>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://unsplash.com/@${image.user.username}`}
                >
                  {image.user.name}
                </a>
              </>
            )}
          </div>
        </Background>
      </>
    </ThemeProvider>
  );
}

export default App;
