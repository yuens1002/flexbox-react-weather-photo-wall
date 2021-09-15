import { useQuery } from 'react-query';
import { getRandom } from '../API/unsplashAPI';

export default function useGetRandomPic({ dispatch, currentTheme }) {
  const { error, isError } = useQuery(
    'getRandomPic',
    () => getRandom(currentTheme),
    {
      refetchInterval: 180000,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const { urls, user } = data;
        dispatch({ type: 'updateImage', payload: { urls, user } });
        dispatch({ type: 'updateBgStyle' });
      },
      onError: (err) => {
        console.log('error from useRandomPic hook: ', err);
      },
    }
  );
  return { error, isError };
}
