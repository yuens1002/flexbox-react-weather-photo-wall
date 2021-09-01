import { useEffect, useReducer, useCallback } from 'react';
import './App.css';
import WeatherGrid from './components/WeatherGrid/WeatherGrid';
import Query from './components/Query/Query';
import { getRandom } from './API/unsplashAPI';

function App() {
  console.log('rendering app...');
  const defaultStyles = {
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  };

  const initialState = {
    weatherData: [],
    containerStyle: {},
    image: {
      urls: {},
      user: {},
    },
    bgStyle: {},
  };

  function getContainerStyles(weatherDataCount) {
    return weatherDataCount ? {} : defaultStyles;
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'updateWeatherData':
        // console.log('updateWeatherData called', action.payload);
        return {
          ...state,
          weatherData: [action.payload, ...state.weatherData],
        };
      case 'updateContainerStyle':
        console.log('updating container style', state);
        return {
          ...state,
          containerStyle: getContainerStyles(state.weatherData.length),
        };
      case 'updateBgStyle':
        console.log('updateByStyle called');
        return {
          ...state,
          bgStyle: {
            backgroundImage: `url(${state.image.urls.regular})`,
            backgroundSize: 'cover',
          },
        };
      case 'updateImage':
        console.log('updateImage action called');
        return { ...state, image: action.payload };
      default:
        return state;
    }
  }

  const [{ weatherData, containerStyle, image, bgStyle }, dispatch] =
    useReducer(reducer, initialState);

  const dispatchWeatherData = useCallback((payload) => {
    dispatch({ type: 'updateWeatherData', payload });
  }, []);

  useEffect(() => {
    console.log('inside useEffect getRandom app.vue');
    getRandom().then((res) => {
      // console.log('🚀 ~ file: App.js ~ line 31 ~ getRandom ~ res', res);

      if (Object.keys(res).length) {
        const { urls, user } = res.response;
        dispatch({ type: 'updateImage', payload: { urls, user } });
        dispatch({ type: 'updateBgStyle' });
      }
    });
  }, []);

  useEffect(() => {
    console.log('inside useEffect dispatch updateContainerStyle', weatherData);
    weatherData.length <= 1 && dispatch({ type: 'updateContainerStyle' });
  }, [weatherData]);

  return (
    <div className='background' style={bgStyle}>
      <div className='container' style={containerStyle}>
        <div className='heading'>
          <div>The weather in</div>
          <div>
            <Query dispatchWeatherData={dispatchWeatherData} />
          </div>
          <div>is like?</div>
        </div>
        {weatherData.length > 0 && <WeatherGrid weatherData={weatherData} />}
      </div>
      {Object.keys(image.urls).length > 0 && (
        <div className='credits'>
          <span>phone by </span>
          <a
            target='_blank'
            rel='noreferrer'
            href={`https://unsplash.com/@${image.user.username}`}
          >
            {image.user.name}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
