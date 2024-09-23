import axiosInstance from "./config";


let lastRequestTime = 0;
const delay = 2000; 

const fetchFromApi = async (endpoint, params = {}) => {
  const currentTime = Date.now();

  // Because of api limit is 1 request per seconds and some requests are being fired at the same time in the page load
  if (currentTime - lastRequestTime < delay) {
    const waitTime = delay - (currentTime - lastRequestTime);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }

  lastRequestTime = Date.now();

  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};


  export const fetchGenres = async () => {
    return await fetchFromApi('/getParams', { param: 'genre' });
  };
  
  export const fetchTop3MoviesByTitle = async (title) => {
    if (title.trim() === '') return [];
    const data = await fetchFromApi('/search', { title, page: 1 });
    const sortedData =  (data.results || []).sort((a, b) => {
        return (b.imageurl?.[0] ? 1 : 0) - (a.imageurl?.[0] ? 1 : 0);
      });
    
    return sortedData.slice(0, 3); 
  };
  
  export const fetchMovies = async (filters) => {
    const { startYear, endYear, minImdb, genre, sort, currentPage } = filters;
    return await fetchFromApi('/advancedsearch', {
      start_year: startYear,
      end_year: endYear,
      min_imdb: minImdb,
      genre,
      sort,
      page: currentPage,
    });
  };

  export const fetchMovieDetails = async (imdbid) => {
    return await axiosInstance.get('/gettitleDetails', { params: { imdbid } });
  };