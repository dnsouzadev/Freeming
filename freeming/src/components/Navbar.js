import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">Freeming</a>

        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">
              Início
            </a>
          </li>
          {/* Você pode adicionar mais links aqui no futuro */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
