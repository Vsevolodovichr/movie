import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getMovies from '@wasp/queries/getMovies';
import createMovie from '@wasp/actions/createMovie';
import archiveMovie from '@wasp/actions/archiveMovie';

export function HomePage() {
  const { data: movies, isLoading, error } = useQuery(getMovies);
  const createMovieFn = useAction(createMovie);
  const archiveMovieFn = useAction(archiveMovie);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieYear, setNewMovieYear] = useState(0);
  const [newMovieGenres, setNewMovieGenres] = useState('');
  const [newMovieCategory, setNewMovieCategory] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateMovie = () => {
    createMovieFn({
      title: newMovieTitle,
      year: newMovieYear,
      genres: newMovieGenres,
      category: newMovieCategory
    });
    setNewMovieTitle('');
    setNewMovieYear(0);
    setNewMovieGenres('');
    setNewMovieCategory('');
  };

  const handleArchiveMovie = (movieId) => {
    archiveMovieFn({ movieId });
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Movie Title'
          className='px-1 py-2 border rounded text-lg'
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type='number'
          placeholder='New Movie Year'
          className='px-1 py-2 border rounded text-lg'
          value={newMovieYear}
          onChange={(e) => setNewMovieYear(parseInt(e.target.value))}
        />
        <input
          type='text'
          placeholder='New Movie Genres'
          className='px-1 py-2 border rounded text-lg'
          value={newMovieGenres}
          onChange={(e) => setNewMovieGenres(e.target.value)}
        />
        <input
          type='text'
          placeholder='New Movie Category'
          className='px-1 py-2 border rounded text-lg'
          value={newMovieCategory}
          onChange={(e) => setNewMovieCategory(e.target.value)}
        />
        <button
          onClick={handleCreateMovie}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Movie
        </button>
      </div>
      <div>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <button
              onClick={() => handleArchiveMovie(movie.id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Archive
            </button>
            <Link
              to={`/movie/${movie.id}`}
              className='text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded'
            >
              {movie.title} ({movie.year})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}