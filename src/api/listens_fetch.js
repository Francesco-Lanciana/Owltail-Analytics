const axios = require("axios");


const getEpData = function(podcast, episode) {
  let epURL = `https://analytics.owltail.com/podcast/${podcast}/episode/${episode}`;

  let epData = axios
    .get(locationurl + encodeURI(location))
    .then(res => res)
    .catch(err => console.log("Cannot fetch ep data"));

  return epData;
};

const getWeather = function(geoLocation) {
  weatherurl = "https://api.darksky.net/forecast/fd243c2601451b582172230e3b91bb04/";
  let temp = axios
    .get(weatherurl + geoLocation.lat + "," + geoLocation.lng)
    .then(res => res.data.currently.temperature)
    .catch(err => console.log(err));

  return temp;
};

getGeoLocation("22 Fletcher Street Essendon Victoria")
  .then(res => getWeather(res))
  .then(res => console.log(res))
  .catch(err => console.log("hello"));
