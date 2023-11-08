import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getMovie from '@wasp/queries/getMovie';
import archiveMovie from '@wasp/actions/archiveMovie';

export function Movie() {
  const { movieId } = useParams();
  const { data: movie, isLoading, error } = useQuery(getMovie, { id: movieId });
  const archiveMovieFn = useAction(archiveMovie);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleArchiveMovie = () => {
    archiveMovieFn({ movieId });
  };

  return (
    <div className='p-4'>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div>{movie.title}</div>
        <div>{movie.year}</div>
        <div>{movie.genres}</div>
        <div>{movie.category}</div>
        <div>{movie.archived ? 'Archived' : 'Not Archived'}</div>
        <button
          onClick={handleArchiveMovie}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          {movie.archived ? 'Unarchive' : 'Archive'}
        </button>
      </div>
      <Link to='/search' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Search</Link>
    </div>
  );
}