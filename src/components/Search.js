import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from 'wouter';
import { fetchTop3MoviesByTitle } from '../api';
import debounce from 'debounce';
import Image from './Image';

const Search = ({ search, setSearch }) => {
  const [top3Movies, setTop3Movies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useRoute();
  let searchRef = useRef(search)

  const getTop3MoviesByTitle = async () => {
    setLoading(true);
    try {
      const data = await fetchTop3MoviesByTitle(searchRef.current);
      setTop3Movies(data);
    } catch (error) {
      console.error('Error fetching top3Movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncegetTop3MoviesByTitle = useRef(debounce(getTop3MoviesByTitle,300)).current;

  useEffect(() => {
    searchRef.current = search
    if(search) debouncegetTop3MoviesByTitle();
  }, [search]);

  const handleClick = (imdbid) => {
    navigate(`/movie/${imdbid}`); 
  };

  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 w-full"
      />
      {loading && <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md">Loading...</div>}

      {top3Movies.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
          {(top3Movies || []).map((movie) => (
            <div
              key={movie.imdbid}
              className="flex items-center p-2 hover:bg-slate-100 cursor-pointer"
              onClick={() => handleClick(movie.imdbid)}
            >
              <Image
                src={movie.imageurl?.[0]} 
                alt={movie.title}
                className="w-12 object-cover rounded-md mr-2"
              />
              <span>{movie.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
