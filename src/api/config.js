import axios from 'axios';

const xRapidapiHost = 'ott-details.p.rapidapi.com';
const xRapidapiKey = 'a345d8a49fmsh9d3b7741234c512p1e7335jsn6da4ad37b28b';

const axiosInstance = axios.create({
  baseURL: `https://${xRapidapiHost}`,
  headers: {
    'x-rapidapi-host': xRapidapiHost,
    'x-rapidapi-key': xRapidapiKey,
  },
});

export default axiosInstance;
