import { useQuery } from 'react-query';
import { getRandom } from '../API/unsplashAPI';

export default function useGetRandomPic({ dispatch }) {
  const { isLoading, error, isError } = useQuery('getRandomPic', getRandom, {
    refetchInterval: 120000,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const { urls, user } = data;
      dispatch({ type: 'updateImage', payload: { urls, user } });
      dispatch({ type: 'updateBgStyle' });
    },
    onError: (err) => {
      console.log('error from useRandomPic hook: ', err);
    },
  });
  return { isLoading, error, isError };
}
