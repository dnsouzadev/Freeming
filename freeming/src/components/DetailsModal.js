import '../styles/DetailsModal.css';

// Reutilizando o ícone de fechar do PlayerModal
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function DetailsModal({ isOpen, onClose, movie, onPlayClick }) {
  // Não renderiza nada se não estiver aberto ou se não houver filme
  if (!isOpen || !movie) {
    return null;
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <div className="details-modal-backdrop" onClick={onClose}>
      <div className="details-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Fundo com o pôster desfocado */}
        <div
          className="details-modal-background"
          style={{ backgroundImage: `url(${movie.poster_url})` }}
        />

        <button className="details-modal-close-button" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="details-modal-body">
          <div className="details-modal-poster">
            <img src={movie.poster_url} alt={`Pôster de ${movie.title}`} />
          </div>
          <div className="details-modal-info">
            <h1>{movie.title} <span className="release-year">({releaseYear})</span></h1>
            <p className="synopsis">{movie.description}</p>
            <button className="play-button" onClick={onPlayClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
              Assistir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
