import axios from 'axios';

const xRapidapiHost = 'ott-details.p.rapidapi.com';
const xRapidapiKey = '44c41f2064msh290d8816b3c4d6cp1159e3jsn0d6440085e8c';

const axiosInstance = axios.create({
  baseURL: `https://${xRapidapiHost}`,
  headers: {
    'x-rapidapi-host': xRapidapiHost,
    'x-rapidapi-key': xRapidapiKey,
  },
});

export default axiosInstance;
