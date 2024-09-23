import React, { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import axiosInstance from '../api/config';
import Image from '../components/Image';
import { fetchMovieDetails } from '../api';

const MoviePage = () => {
  const [match, params] = useRoute('/movie/:id');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovieDetails = async (id) => {
    try {
      const result = fetchMovieDetails(id)
      setMovie(result.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (match) {
      getMovieDetails(params.id);
    }
  }, [match, params.id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!movie) {
    return <h2 className="text-center">Movie not found!</h2>;
  }
  const platforms = Object.entries(movie.streamingAvailability.country)
  return (
    <div className="max-w-2xl mx-auto p-6 m-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <Image
        src={movie.imageurl[0]}
        alt={movie.title}
        className="w-full h-auto max-h-[300px] object-cover rounded-md mb-4"
      />
      <p className="text-gray-700 mb-4"><strong>Genre:</strong> {movie.genre.join(', ')}</p>
      <p className="text-gray-700 mb-4"><strong>IMDB Rating:</strong> {movie.imdbrating || 'N/A'}</p>
      <p className="text-gray-700 mb-4"><strong>Released:</strong> {movie.released}</p>
      <p className="text-gray-700 mb-4"><strong>Runtime:</strong> {movie.runtime}</p>
      <p className="text-gray-700 mb-4"><strong>Synopsis:</strong> {movie.synopsis}</p>
      
      {!!platforms?.length &&  <>
        <h2 className="text-xl font-semibold mb-2">Available on:</h2>
       <ul className="list-disc pl-5 mb-4">
        {platforms.map(([country, platforms]) => (
          <li key={country} className="mb-2">
            <strong>{country}:</strong>
            <ul className="list-disc pl-5">
              {platforms.map(platform => (
                <li key={platform.platform}>
                  <a 
                    href={platform.url} 
                    className="text-slate-500 hover:underline" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {platform.platform}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      
      </>}

      <Link href="/" className="text-slate-500 hover:underline">
        Back to Movies
      </Link>
    </div>
  );
};

export default MoviePage;
