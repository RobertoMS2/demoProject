const comicUtils = require('./comicUtils');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

comicUtils.getComic(id);