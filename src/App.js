import { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';
import './App.css';
import WeatherGrid from './components/WeatherGrid/WeatherGrid';
import Query from './components/Query/Query';
import { getRandom } from './API/unsplashAPI';
import { AppReducer } from './reducers';

const initialState = {
  weatherData: [],
  containerStyle: {},
  image: {
    urls: {},
    user: {},
  },
  bgStyle: {},
};

function App() {
  console.log('rendering app...');

  const [{ weatherData, containerStyle, image, bgStyle }, dispatch] =
    useReducer(AppReducer, initialState);

  useQuery('fetchRandomPic', getRandom, {
    onSuccess: (data) => {
      const { urls, user } = data.response;
      dispatch({ type: 'updateImage', payload: { urls, user } });
      dispatch({ type: 'updateBgStyle' });
    },
  });

  const dispatchWeatherData = (payload) => {
    dispatch({ type: 'updateWeatherData', payload });
  };

  useEffect(() => {
    console.log('inside useEffect dispatch updateContainerStyle', weatherData);
    weatherData.length <= 1 && dispatch({ type: 'updateContainerStyle' });
  }, [weatherData]);

  return (
    <div className="background" style={bgStyle}>
      <div className="container" style={containerStyle}>
        <div className="heading">
          <div>The weather in</div>
          <div>
            <Query dispatchWeatherData={dispatchWeatherData} />
          </div>
          <div>is like?</div>
        </div>
        {weatherData.length > 0 && <WeatherGrid weatherData={weatherData} />}
      </div>
      {Object.keys(image.urls).length > 0 && (
        <div className="credits">
          <span>photo by </span>
          <a
            target="_blank"
            rel="noreferrer"
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
