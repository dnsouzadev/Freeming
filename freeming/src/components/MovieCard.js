import '../styles/MovieCard.css';

// Componente do ícone de Play (SVG) para clareza
const PlayIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.5 18.25V5.75C8.5 4.7125 9.5625 4.025 10.475 4.55L19.325 10.3C20.15 10.775 20.15 12.025 19.325 12.5L10.475 18.25C9.5625 18.775 8.5 18.0875 8.5 17.05V18.25Z"
      fill="white"
    />
  </svg>
);


function MovieCard({ movie }) {
  const { title, poster_url, release_date, embed_url } = movie;

  // Formata o ano de lançamento
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';

  return (
    // O card agora é um link que abre o player em uma nova aba
    <a
      href={embed_url}
      target="_blank"
      rel="noopener noreferrer"
      className="movie-card-link"
    >
      <div className="movie-card">
        <div className="card-image-container">
          <img src={poster_url} alt={`Pôster de ${title}`} className="card-image" />
          <div className="play-overlay">
            <PlayIcon />
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-release-year">{releaseYear}</p>
        </div>
      </div>
    </a>
  );
}

export default MovieCard;
