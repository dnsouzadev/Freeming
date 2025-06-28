import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Freeming. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
