import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
  const URL = `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(resp => {
    if (!resp.ok || resp.statusCode === 404) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return resp.json();
  });
}

export { fetchCountries };
