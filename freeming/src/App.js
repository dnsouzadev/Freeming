import { useCallback, useState } from 'react';
import './App.css';
import DetailsModal from './components/DetailsModal';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import Navbar from './components/Navbar';
import PlayerModal from './components/PlayerModal';
import SearchBar from './components/SearchBar';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  // --- LÓGICA DE MODAIS ATUALIZADA ---
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Armazena o objeto do filme inteiro

  const handleSearch = useCallback(async (query) => {
    setIsLoading(true);
    setError('');
    setSearched(true);
    setMovies([]);

    // Lembre-se de que no deploy final, a URL deve ser relativa, como '/api/watch/...'
    // Para desenvolvimento local, você pode usar a URL completa do seu backend.
    const searchUrl = `http://localhost:8000/watch/search/${encodeURIComponent(query)}`;

    try {
      const response = await fetch(searchUrl);
      if (!response.ok) throw new Error('Falha na resposta da API');
      const data = await response.json();
      const results = Object.values(data);
      if (results.length > 0) {
        setMovies(results);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setError('Ocorreu um erro ao buscar o filme. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- NOVAS FUNÇÕES DE CONTROLE ---

  // Chamada quando um card de filme é clicado
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsDetailsModalOpen(true);
  };

  // Fecha o modal de detalhes (e garante que o player também feche)
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setIsPlayerOpen(false); // Garante que o player feche junto
    setSelectedMovie(null);
  };

  // Chamada pelo botão "Assistir" dentro do DetailsModal
  const handlePlayClick = () => {
    setIsPlayerOpen(true);
  };

  // Fecha apenas o modal do player
  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
  };

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        <div className="results-container">
          {isLoading && <p className="status-message">Carregando...</p>}
          {error && <p className="status-message error">{error}</p>}
          {!isLoading && !error && searched && movies.length === 0 && (
            <p className="status-message">Nenhum filme encontrado com esse nome.</p>
          )}
          {!isLoading && !error && !searched && (
             <p className="status-message">Comece buscando por um filme no campo acima.</p>
          )}

          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Renderiza o Modal de Detalhes */}
      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        movie={selectedMovie}
        onPlayClick={handlePlayClick}
      />

      {/* Renderiza o Modal do Player, que agora é controlado pelo DetailsModal */}
      {selectedMovie && (
        <PlayerModal
          isOpen={isPlayerOpen}
          onClose={handleClosePlayer}
          videoUrl={selectedMovie.embed_url}
        />
      )}
    </div>
  );
}

export default App;
