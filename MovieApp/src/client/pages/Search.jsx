import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getMoviesByCategory from '@wasp/queries/getMoviesByCategory';
import getMoviesByTitle from '@wasp/queries/getMoviesByTitle';
import getMoviesByYear from '@wasp/queries/getMoviesByYear';
import getMoviesByGenres from '@wasp/queries/getMoviesByGenres';

export function Search() {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchGenres, setSearchGenres] = useState('');

  const { data: moviesByCategory } = useQuery(getMoviesByCategory, { category: searchCategory });
  const { data: moviesByTitle } = useQuery(getMoviesByTitle, { title: searchTitle });
  const { data: moviesByYear } = useQuery(getMoviesByYear, { year: searchYear });
  const { data: moviesByGenres } = useQuery(getMoviesByGenres, { genres: searchGenres });

  return (
    <div>
      <input type="text" placeholder="Category" value={searchCategory} onChange={e => setSearchCategory(e.target.value)} />
      <input type="text" placeholder="Title" value={searchTitle} onChange={e => setSearchTitle(e.target.value)} />
      <input type="text" placeholder="Year" value={searchYear} onChange={e => setSearchYear(e.target.value)} />
      <input type="text" placeholder="Genres" value={searchGenres} onChange={e => setSearchGenres(e.target.value)} />

      {moviesByCategory && <div>Results by Category: {moviesByCategory.length}</div>}
      {moviesByTitle && <div>Results by Title: {moviesByTitle.length}</div>}
      {moviesByYear && <div>Results by Year: {moviesByYear.length}</div>}
      {moviesByGenres && <div>Results by Genres: {moviesByGenres.length}</div>}
    </div>
  );
}