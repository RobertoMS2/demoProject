const seriesUtils = require('./seriesUtils');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id !== null && id !== '') {
    seriesUtils.getSerie(id);
} else {
    seriesUtils.getSeriesExtended();
}