import { useState, memo } from 'react';
import { getWeather } from '../../API/openWeather';
import { getPhotos } from '../../API/unsplashAPI';
import { getGeoLocation } from '../../API/openGEOcode';
import './Query.css';

export default memo(function Query({ updateWeatherData }) {
  console.log('rendering Query...');
  const [location, setLocation] = useState('');
  const [placeholderText, setPlaceholderText] = useState('(enter) a US city');

  function handleInputChange(event) {
    setLocation(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setPlaceholderText(location);
    setLocation('');

    const theWeather = (await getWeather(location)) || {};

    const notFound = Object.keys(theWeather).length === 0;
    notFound && setPlaceholderText('sorry, nothing found!');

    if (!notFound) {
      const {
        name,
        weather,
        main,
        coord: { lat, lon: lng },
      } = theWeather;

      const geoData = await getGeoLocation({ lat, lng });

      const { adminArea3: state } = geoData.results[0].locations[0];

      getPhotos(`${name}, ${state} ${weather[0].description}`).then((res) => {
        // console.log('🚀 ~ file: Query.js ~ line 39 ~ getPhotos ~ res', res);
        const { user, urls, description, id } = res[0] || {};

        updateWeatherData({
          user,
          urls,
          description,
          name,
          id,
          state,
          temp: main.temp,
          summary: weather[0].description,
          imgSrc: `http://openweathermap.org/img/wn/${weather[0].icon}.png`,
        });
      });
    }
  }

  return (
    <form
      id="query-form"
      onSubmit={handleSubmit}
      className="query"
      autoComplete="off"
    >
      <input
        title="query"
        placeholder={placeholderText}
        className="query-input"
        type="text"
        value={location}
        onChange={handleInputChange}
      />
    </form>
  );
});
