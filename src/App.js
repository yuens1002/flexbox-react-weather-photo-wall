import { useEffect, useCallback } from 'react';
import './App.css';
import WeatherGrid from './components/WeatherGrid/WeatherGrid';
import Query from './components/Query/Query';
import useGetRandomPic from './hooks/useRandomPic';
import useAppReducer from './hooks/useAppReducer'
import { ThemeProvider } from 'styled-components';
import Background from './components/Background/Background';
import GlobalStyles from './globalStyles';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function App() {
  console.log('rendering app...');

  const [
    { weatherData, containerStyle, image, bgStyle, theme, currentTheme },
    dispatch,
  ] = useAppReducer();

  // may consider have a data variable from useGetRandomPic for ease of testing
  const { isError, error } = useGetRandomPic({
    dispatch,
    currentTheme,
  });

  const updateWeatherData = useCallback((payload) => {
    dispatch({ type: 'updateWeatherData', payload });
  }, [dispatch]);

  const updateCurrentTheme = useCallback((payload) => {
    dispatch({ type: 'updateCurrentTheme', payload });
  }, [dispatch]);

  const updateTheme = useCallback(() => {
    dispatch({ type: 'updateTheme' });
  }, [dispatch]);

  useEffect(() => {
    // console.log('inside useEffect dispatch updateContainerStyle', weatherData);
    weatherData.length <= 1 && dispatch({ type: 'updateContainerStyle' });
  }, [weatherData.length, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Background style={bgStyle}>
          <div data-testid="content-container" className="container" style={containerStyle}>
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
          <ThemeToggle
            updateCurrentTheme={updateCurrentTheme}
            updateTheme={updateTheme}
            currentTheme={currentTheme}
          />
        </Background>
      </>
    </ThemeProvider>
  );
}

export default App;
