import React, { useEffect, useState } from 'react';
import { fetchGenres } from '../api';

const Categories = ({ setGenre, genre:selectedGenre }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      try {
        const data = await fetchGenres();
        setGenres(['All'].concat(data));
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, []);

  return (
    <div className="my-2">
    {loading ? (
      <p className="text-gray-500">Loading genres...</p>
    ) : (
      <div className="flex gap-2 w-full overflow-auto">
        {genres.map((genre) => (
          <span
            key={genre}
            onClick={() => setGenre(genre)}
            className={`cursor-pointer w-max inline-flex whitespace-nowrap bg-slate-500 text-white rounded-full px-4 py-2 text-sm hover:bg-slate-800 transition duration-200 ${(genre === 'All' ? '' : genre) === selectedGenre ? 'bg-slate-700' : ''}`}
          >
            {genre}
          </span>
        ))}
      </div>
    )}
  </div>
  );
};

export default Categories;
