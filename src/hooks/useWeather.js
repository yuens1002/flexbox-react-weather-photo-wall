import { useQuery } from 'react-query';
import { getWeather } from '../API/openWeather';

export default function useWeather(location) {
  return useQuery(['getWeather', location], () => getWeather(location));
}
