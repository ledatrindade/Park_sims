// Importa a biblioteca React, essencial para construir componentes de interface.
import React from 'react';
// Importa o arquivo CSS principal para estilos globais e de layout da aplicação.
import './App.css';

// Importa os componentes de página da pasta 'pages'.
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Atracoes from './pages/Atracoes';
import Parcerias from './pages/Parcerias';
import TrabalheConosco from './pages/Trabalheconosco';
import Contato from './pages/Contato';

// Importa os componentes compartilhados da pasta 'components'.
import Navbar from './components/Navbar';           // Barra de navegação principal.
import PetalasCanvas from './components/PetalasCanvas'; // Componente para o fundo animado de pétalas.
import Footer from "./components/Footer";         // Rodapé da aplicação.

/**
 * Componente principal da aplicação (App).
 * Este componente orquestra a estrutura geral da página,
 * incluindo a navegação, o conteúdo das seções e o rodapé,
 * além de integrar o fundo animado.
 *
 * @returns {JSX.Element} O elemento JSX que renderiza toda a aplicação.
 */
function App() {
  return (
    // Fragmento React, usado para agrupar elementos sem adicionar um nó extra ao DOM.
    <>
      {/* Contêiner principal da aplicação.
          Esta div envolve todo o conteúdo visível da página. */}
      <div className="app-container">
        {/* Componente PetalasCanvas:
            Ele é posicionado como um fundo fixo que ocupa toda a tela.
            Seu `z-index: -1` no CSS (App.css) garante que ele fique atrás de todo o conteúdo.
            O `pointer-events: none` (definido no próprio PetalasCanvas.jsx)
            permite que cliques e interações passem por ele para os elementos abaixo. */}
        <PetalasCanvas />

        {/* Componente Navbar:
            A barra de navegação principal da aplicação.
            Possui um `z-index` mais alto para sempre estar visível e interativa no topo. */}
        <Navbar />

        {/* Elemento <main> com a classe "content":
            Contém as principais seções da página.
            O `min-height: 100vh` e `display: flex; flex-direction: column`
            garantem que o conteúdo se empilhe verticalmente e ocupe pelo menos a altura da tela,
            permitindo a rolagem. */}
        <main className="content">
          {/* Cada componente de página é renderizado sequencialmente.
              Os IDs das seções (ex: `id="home"`) são usados pela Navbar para rolagem suave. */}
          <Home />
          <Sobre />
          <Parcerias />
          <Atracoes />
          <Contato />
          <TrabalheConosco />
          {/* O rodapé da aplicação. */}
          <Footer />
        </main>
      </div>
    </>
  );
}

// Exporta o componente App para ser o ponto de entrada da aplicação React.
export default App;