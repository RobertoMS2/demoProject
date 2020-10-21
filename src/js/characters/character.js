const characterUtils = require('./characterUtils');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id !== null && id !== '') {
    characterUtils.getCharacter(id);
} else {
    characterUtils.getCharacters();
}