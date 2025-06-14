// Importa o arquivo CSS para estilização específica da barra de navegação.
import './Navbar.css';
// Importa o ícone 'simsIcon' da pasta 'assets' para ser usado na logo.
import simsIcon from '../assets/simsicon.svg';

/**
 * Componente funcional Navbar.
 * Representa a barra de navegação principal do site, incluindo a logo e os links de navegação.
 * @returns {JSX.Element} O elemento JSX que renderiza a barra de navegação.
 */
function Navbar() {
  return (
    // Elemento <nav> principal da barra de navegação, com a classe CSS 'navbar' para estilização.
    <nav className="navbar">
      {/* Div que contém a logo do site. */}
      <div className="logo">
        {/* Imagem do ícone dos Sims, com texto alternativo para acessibilidade e classe para estilização. */}
        <img src={simsIcon} alt="Sims Icon" className="sims-icon" />
        {/* Texto da logo. */}
        Park Sims
      </div>
      {/* Lista não ordenada para os links de navegação. */}
      <ul className="nav-links">
        {/* Item de lista para cada link de navegação. */}
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

// Exporta o componente Navbar para que ele possa ser usado em outras partes da aplicação.
export default Navbar;