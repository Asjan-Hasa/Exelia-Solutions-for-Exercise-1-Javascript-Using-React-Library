import React from 'react';
import Image from './Image';

const MovieCard = ({ movie }) => {

  return (
    <div className="movie-card max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer">
      <Image
        className="w-full h-48 object-cover"
        src={movie?.imageurl?.[0]} 
        alt={movie.title}
      />
      <span className='imdb'>{movie.imdbrating}</span>
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-800 line-clamp-1">{movie.title}</h5>
        <p className="text-gray-600">
          {movie.released} | {movie.genre.join(', ')}
        </p>
        <p className="text-gray-500 text-sm line-clamp-3">{movie.synopsis || 'No synopsis available.'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
