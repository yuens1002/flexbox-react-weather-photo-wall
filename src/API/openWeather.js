import axios from 'axios';

const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = process.env['REACT_APP_OW_API_KEY'];

export async function getWeather(city) {
  console.log('🚀 ~ file: openWeather.js ~ line 7 ~ getWeather ~ city', city);
  try {
    const { data } = await axios(
      `${url}?q=${city}&appid=${apiKey}&units=metric`
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
