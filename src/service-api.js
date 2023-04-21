const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
  const URL = `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(resp => {
    if (!resp.ok || resp.statusCode === 404) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchCountries };
