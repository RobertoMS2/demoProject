const characterUtils = require('./characterUtils');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id !== null && id !== '') {
    characterUtils.getCharacter(id);
    const elto = document.querySelector('#catHeader');
    elto.style.display = "none";
} else {
    characterUtils.getCharacters();
    const elto = document.querySelector('#detHeader');
    elto.style.display = "none";
}