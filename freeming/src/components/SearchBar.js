import { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return; // Não busca se o campo estiver vazio
    onSearch(query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busque por um filme..."
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </div>
  );
}

export default SearchBar;
