import { createApi } from 'unsplash-js';

const accessKey = process.env['REACT_APP_UPSPLASH_ACCESS_TOKEN'];

const api = createApi({ accessKey });
let options = { orientation: 'landscape', per_page: 1 };
export function getPhotos(query) {
  // console.log('api called');
  options = { ...options, query };
  return api.search
    .getPhotos(options)
    .then((res) => {
      // the api returns errors like an OK response
      if (res.type === 'error') {
        throw Error(res.errors[0]);
      }
      // console.log(res.response.results);
      return res.response.results;
    })
    .catch((e) => console.log(e));
}

export function getRandom() {
  // error handling is being done on the useRandomPic hook
  return api.photos
    .getRandom({ query: 'dark background' })
    .then((res) => res.response);
}
