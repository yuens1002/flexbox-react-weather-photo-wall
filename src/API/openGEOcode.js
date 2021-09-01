import axios from 'axios';

const url = 'http://open.mapquestapi.com/geocoding/v1/reverse?';
const apiKey = process.env['REACT_APP_OPEN_GEOCODE_KEY'];

export async function getGeoLocation({ lat, lng }) {
  try {
    const { data } = await axios(`${url}key=${apiKey}&location=${lat}, ${lng}`);
    if (data.info.statuscode !== 0) throw Error(data.info.message);
    return data;
  } catch (err) {
    console.log(err);
  }
}
