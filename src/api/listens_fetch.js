// const axios = require("axios");
//
// let locationurl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
//
// const getGeoLocation = function(location) {
//   let geoLocation = axios
//     .get(locationurl + encodeURI(location))
//     .then(res => res.data.results[0].geometry.location)
//     .catch(err => console.log("Hello"));
//
//   return geoLocation;
// };
//
// const getWeather = function(geoLocation) {
//   weatherurl = "https://api.darksky.net/forecast/fd243c2601451b582172230e3b91bb04/";
//   let temp = axios
//     .get(weatherurl + geoLocation.lat + "," + geoLocation.lng)
//     .then(res => res.data.currently.temperature)
//     .catch(err => console.log(err));
//
//   return temp;
// };
//
// getGeoLocation("22 Fletcher Street Essendon Victoria")
//   .then(res => getWeather(res))
//   .then(res => console.log(res))
//   .catch(err => console.log("hello"));
