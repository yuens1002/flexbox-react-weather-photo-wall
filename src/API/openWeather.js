import axios from 'axios';

const url = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env['REACT_APP_OW_API_KEY'];

export async function getWeather(city) {
  // console.log('🚀 ~ file: openWeather.js ~ line 7 ~ getWeather ~ city', city);
  try {
    const { data } = await axios(
      `${url}/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getForcast({ lat, lon }) {
  console.log('🚀 ~ file: openWeather.js ~ line 7 ~ getWeather ~ city', lat, lon);
  const numberOfDays = 3;
  try {
    const { data } = await axios(
      `${url}/forecast/daily?lat=${lat}&lon=${lon}&cnt=${numberOfDays}&appid=${apiKey}&units=metric`
    );
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
