import { useQuery } from 'react-query';
import { getRandom } from '../API/unsplashAPI';

export default function useGetRandomPic() {
  return useQuery('getRandomPic', getRandom);
}
