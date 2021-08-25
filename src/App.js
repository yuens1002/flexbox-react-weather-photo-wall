import { useState, useEffect } from 'react';
import './App.css';
import WeatherGrid from './components/WeatherGrid/WeatherGrid';
import Query from './components/Query/Query';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    function getStyles() {
      return weatherData.length === 0
        ? {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100vh',
          }
        : {};
    }
    setContainerStyle(getStyles());
  }, [weatherData.length]);

  return (
    <div className='container' style={containerStyle}>
      <div className='heading'>
        <div>The weather in</div>
        <div>
          <Query setWeatherData={setWeatherData} />
        </div>
        <div>is like?</div>
      </div>
      {weatherData.length > 0 && <WeatherGrid weatherData={weatherData} />}
    </div>
  );
}

export default App;
