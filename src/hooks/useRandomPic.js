import { useQuery } from 'react-query';
import { getRandom } from '../API/unsplashAPI';

export default function useGetRandomPic({ dispatch, currentTheme }) {
  console.log(
    '🚀 ~ file: useRandomPic.js ~ line 5 ~ useGetRandomPic ~ currentTheme',
    currentTheme
  );
  const { error, isError, refetch } = useQuery(
    // this is too good, wish i had known about this earlier...
    ['getRandomPic', currentTheme],
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
  return { error, isError, refetch };
}
