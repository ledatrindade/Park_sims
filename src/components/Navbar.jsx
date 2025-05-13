import './Navbar.css';
import simsIcon from '../assets/simsicon.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
    <img src={simsIcon} alt="Sims Icon" className="sims-icon" />
    Park Sims
  </div>
      <ul className="nav-links">
        <li><a href="#home">Início</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#parcerias">Parcerias</a></li>
        <li><a href="#atracoes">Atrações</a></li>
        <li><a href="#contato">Contato</a></li>
        <li><a href="#trabalhe">Trabalhe Conosco</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
