import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './service-api'; 
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const value = evt.target.value.trim();
 
  if (!value) {
    listEl.innerHTML = '';
    infoEl.innerHTML = ''; 
    return;
}
  fetchCountries(value)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        listEl.innerHTML = '';
      }
      if (data.length === 1) {
        infoEl.innerHTML = createCard(data);
      }
      if (data.length > 1) {
        infoEl.innerHTML = '';
      }
      if (data.length < 10) {
        listEl.innerHTML = createMarkup(data);
      }
    })
    .catch(onFetchError);
}
  


function createMarkup(arr) {
  return arr
    .map(
      ({ name: { official }, flags: { svg } }) =>
        ` <li class="country">
          <img src="${svg}" alt="" width="30" height="auto">
          <h2>${official}</h2>
         </li>`
    )
    .join('');
}
 
function createCard(arr) {
  return arr
    .map(
      ({ capital, population, languages }) =>
        `<p class="info">Capital:<span class="text">${capital}</span></p>
         <p class="info">Population:<span class="text">${population}</span></p>
         <p class="info">Languages:<span class="text">${Object.values(languages)}</span></p>`
    )
    .join('');
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  listEl.innerHTML = '';
  infoEl.innerHTML = ''; 
}


