import { useCallback, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';

function App() {
  // 1. MUDANÇA: Alterado de 'movie' para 'movies' e o estado inicial é um array vazio.
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  // 2. MUDANÇA: A função de busca agora está preparada para a nova estrutura da API.
  const handleSearch = useCallback(async (query) => {
    setIsLoading(true);
    setError('');
    setSearched(true);
    setMovies([]); // Limpa os resultados anteriores

    // Coloque a URL da sua API real aqui
    const searchUrl = `http://localhost:8000/watch/search/${encodeURIComponent(query)}`;

    try {
      const response = await fetch(searchUrl);
      if (!response.ok) throw new Error('Falha na resposta da API');
      const data = await response.json();


      // **A MÁGICA ACONTECE AQUI!**
      // Object.values() pega todos os valores do objeto (os filmes)
      // e os transforma em um array.
      // {"0": {filmeA}} se torna [{filmeA}]
      const results = Object.values(data);

      if (results.length > 0) {
        setMovies(results); // Armazena o array de filmes encontrados
      } else {
        setMovies([]); // Garante que a lista está vazia se nada for encontrado
      }
    } catch (err) {
      setError('Ocorreu um erro ao buscar o filme. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />

        {/* 3. MUDANÇA: A lógica de renderização agora lida com um array de filmes */}
        <div className="results-container">
          {isLoading && <p className="status-message">Carregando...</p>}
          {error && <p className="status-message error">{error}</p>}

          {!isLoading && !error && searched && movies.length === 0 && (
            <p className="status-message">Nenhum filme encontrado com esse nome.</p>
          )}

          {!isLoading && !error && !searched && (
             <p className="status-message">Comece buscando por um filme no campo acima.</p>
          )}

          {/* Adicionamos um container com a classe 'movie-grid' para o layout */}
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
