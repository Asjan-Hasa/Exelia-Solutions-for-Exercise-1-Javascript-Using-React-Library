import React, { useEffect, useRef, useState } from 'react';
import AdvancedFilters from '../components/AdvancedFilters';
import Categories from '../components/Categories';
import Movies from '../components/Movies';
import Pagination from '../components/Pagination';
import { fetchMovies } from '../api';
import debounce from 'debounce';

const Home = () => {
  const [search, setSearch] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [minImdb, setMinImdb] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const filtersRef = useRef({})

  const getMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(filtersRef.current);
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const debounceFetchMovies = useRef(debounce(getMovies,300)).current;
  const updateFiltersForDebounce = () => {
    filtersRef.current = {startYear:startYear?.value, endYear:endYear?.value, minImdb, genre: genre==="All" ? '' : genre, sort, currentPage}
  }
  useEffect(() => {
    if(currentPage === 1){
        updateFiltersForDebounce()
    debounceFetchMovies();
    }else{
        setCurrentPage(1)
    }
  }, [startYear?.value, endYear?.value, minImdb, genre, sort]);

  useEffect(() => {
    updateFiltersForDebounce()
    debounceFetchMovies();
  }, [currentPage]);

  return (
    <div className='p-2'>
      <AdvancedFilters
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setSearch={setSearch}
        search={search}
        setEndYear={setEndYear}
        minImdb={minImdb}
        setMinImdb={setMinImdb}
        sort={sort}
        setSort={setSort}
      />
      <Categories setGenre={setGenre} genre={genre} />
      <div className='movies-list'>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <>
          <Movies movies={movies} />
        </>
      )}
      </div>
      <Pagination totalPages={10} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
