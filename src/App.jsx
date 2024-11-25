import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getPreparedFilms(films, { query }) {
  let preparedFilms = [...films];
  const normalizedQuery = query.trim().toLowerCase();

  if (query) {
    preparedFilms = preparedFilms.filter(
      film =>
        film.title.toLowerCase().includes(normalizedQuery) ||
        film.description.toLowerCase().includes(normalizedQuery),
    );
  }

  return preparedFilms;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const visibleFilms = getPreparedFilms(moviesFromServer, { query });

  function filterBy(newQuery) {
    setQuery(newQuery);
  }

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={event => filterBy(event.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleFilms} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
