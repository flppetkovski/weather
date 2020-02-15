const request = require("request");
const airQuality = location => {
  airQualityURL = `https://api.waqi.info/feed/${location}/?token=39171302235f3e4b74c387edb5c8df7e3159d178`;
  request({ url: airQualityURL, json: true }, (error, { body }) => {
    return body.data.aqi;
  });
};

module.exports = airQuality;
