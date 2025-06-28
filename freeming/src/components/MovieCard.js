import '../styles/MovieCard.css';

function MovieCard({ movie }) {
  const { title, poster_url, description, release_date } = movie;

  // Formata a data para o padrão brasileiro (DD/MM/AAAA)
  const formattedDate = new Date(release_date).toLocaleDateString('pt-BR', {
    timeZone: 'UTC', // Importante para evitar problemas com fuso horário
  });

  return (
    <div className="movie-card">
      <div className="card-image-container">
        <img src={poster_url} alt={`Pôster de ${title}`} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-release-date">Lançamento: {formattedDate}</p>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
