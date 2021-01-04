const seriesUtils = require('./seriesUtils');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id !== null && id !== '') {
    seriesUtils.getSerie(id);
    const elto = document.querySelector('#detHeader');
    elto.style.display = "block";
} else {
    seriesUtils.getSeriesExtended();
    const elto = document.querySelector('#catHeader');
    elto.style.display = "block";
}