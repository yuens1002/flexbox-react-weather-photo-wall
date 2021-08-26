import { useState } from 'react';
import { getWeather } from '../../API/openWeather';
import { getPhotos } from '../../API/unsplashAPI';
import './Query.css';

export default function Query({ setWeatherData }) {
  const [location, setLocation] = useState('');
  const [placeholderText, setPlaceholderText] = useState('(enter) a US city');

  async function handleSubmit(event) {
    event.preventDefault();
    setPlaceholderText(location);
    setLocation('');

    const theWeather = (await getWeather(location)) || {};

    const notFound = Object.keys(theWeather).length === 0;
    notFound && setPlaceholderText('sorry, nothing found!');
    if (!notFound) {
      const { name, weather, main } = theWeather;
      getPhotos(`${name}, ${weather[0].description}, day`).then((res) => {
        console.log('🚀 ~ file: Query.js ~ line 26 ~ getPhotos ~ res', res);
        const { user, urls, description, id } = res[0] || {};
        setWeatherData({
          type: 'updateWeatherData',
          payload: {
            user,
            urls,
            description,
            name,
            id,
            temp: main.temp,
            summary: weather[0].description,
            imgSrc: `http://openweathermap.org/img/wn/${weather[0].icon}.png`,
          },
        });
      });
    }
  }
  function handleInputChange(event) {
    console.log('event: ', event.target.value);
    setLocation(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit} className='query' autoComplete='off'>
      <input
        placeholder={placeholderText}
        className='query-input'
        type='text'
        value={location}
        onChange={handleInputChange}
      />
    </form>
  );
}
