import { createApi } from 'unsplash-js';

const accessKey = process.env['REACT_APP_UPSPLASH_ACCESS_TOKEN'];

const api = createApi({ accessKey });
let options = { orientation: 'landscape', per_page: 3 };
export function getPhotos(query) {
  // console.log('api called');
  options = { ...options, query };
  return api.search
    .getPhotos(options)
    .then((res) => {
      // the api returns errors like an OK response
      if (res.status === 401) {
        throw Error(res.errors[0]);
      }
      return res.response.results;
    })
    .catch((e) => console.log(e));
}
