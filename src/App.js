import { useEffect, useReducer } from 'react';
import './App.css';
import WeatherGrid from './components/WeatherGrid/WeatherGrid';
import Query from './components/Query/Query';
import { getRandom } from './API/unsplashAPI';

function App() {
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

  function reducer(state, action) {
    switch (action.type) {
      case 'updateWeatherData':
        // console.log('updateWeatherData called', action.payload);
        return {
          ...state,
          weatherData: [action.payload, ...state.weatherData],
        };
      case 'updateContainerStyle':
        let styles = {};

        if (!state.weatherData.length) {
          styles = defaultStyles;
        }
        // console.log('🚀 ~ file: App.js ~ line 41 ~ reducer ~ styles', styles);
        return {
          ...state,
          containerStyle: { ...styles },
        };
      case 'updateBgStyle':
        return {
          ...state,
          bgStyle: {
            backgroundImage: `url(${state.image.urls.regular})`,
            backgroundSize: 'cover',
          },
        };
      case 'updateImage':
        return { ...state, image: action.payload };
      default:
        return state;
    }
  }
  const [{ weatherData, containerStyle, image, bgStyle }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'updateContainerStyle' });
    if (!weatherData.length) {
      getRandom().then((res) => {
        // console.log('🚀 ~ file: App.js ~ line 31 ~ getRandom ~ res', res);

        if (Object.keys(res).length) {
          const { urls, user } = res.response;
          dispatch({ type: 'updateImage', payload: { urls, user } });
          dispatch({ type: 'updateBgStyle' });
        }
      });
    }
  }, [weatherData.length]);

  return (
    <>
      <div className='background' style={bgStyle}>
        <div className='container' style={containerStyle}>
          <div className='heading'>
            <div>The weather in</div>
            <div>
              <Query setWeatherData={dispatch} />
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
    </>
  );
}

export default App;
