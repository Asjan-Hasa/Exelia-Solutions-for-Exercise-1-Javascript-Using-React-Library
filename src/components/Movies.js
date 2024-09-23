import React from 'react';
import MovieCard from './MovieCard';

const Movies = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-1">
      {movies.map(movie => (
        <a key={movie.imdbid} href={`/movie/${movie.imdbid}`}>
          <MovieCard movie={movie} />
        </a>
      ))}
    </div>
  );
};

export default Movies;
