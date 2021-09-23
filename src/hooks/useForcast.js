import { useQuery } from 'react-query';
import { getForcast } from '../API/openWeather';

export default function useForcast(gps) {
  console.log('🚀 ~ file: useForcast.js ~ line 5 ~ useForcast ~ ', gps);

  const { data, refetch, isError, isLoading } = useQuery(
    ['getForcast', gps],
    () => getForcast(gps),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  return { data, refetch, isError, isLoading };
}
