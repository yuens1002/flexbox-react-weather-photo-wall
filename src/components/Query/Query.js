import { useState, memo } from 'react';
import { getWeather } from '../../API/openWeather';
import { getPhotos } from '../../API/unsplashAPI';
import { getGeoLocation } from '../../API/openGEOcode';
import styled from 'styled-components';
import { toRGBSpec } from '../../themes/colorPalette';

const StyledQ = styled.form`
  padding: 0 12px;
  display: inline-block;
  .query-input {
    font-size: 2rem;
    text-align: center;
    font-style: italic;
    padding: 10px;
    width: 250px;
    background-color: ${({ theme }) => toRGBSpec(theme.highlight, 0.8)};
    border: none;
    margin: 10px auto;
    transition: background-color 0.8s ease;
    :focus {
      background-color: ${({ theme }) =>
        toRGBSpec(theme.highlight, theme.link.hover)};
    }
    ::placeholder {
      color: ${({ theme }) => toRGBSpec(theme.color, theme.link.link)};
    }
  }
`;

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
    <StyledQ
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
    </StyledQ>
  );
});
