// src/pages/Home.jsx

// Importa React e o hook useState para gerenciar o estado do componente.
import React, { useState } from 'react';
// Importa os estilos CSS específicos para a seção Home.
import '../styles/Home.css';
// Importa a imagem de fundo do parque.
import parkBackground from '../assets/park.webp';
// Importa o componente modal para compra de ingressos.
import CompraIngressosModal from '../components/CompraIngressosModal';

/**
 * Componente funcional Home.
 * Esta página representa a seção inicial do site, exibindo uma mensagem de boas-vindas,
 * informações introdutórias e um botão para comprar ingressos que abre um modal.
 *
 * @returns {JSX.Element} O elemento JSX que renderiza a seção Home.
 */
const Home = () => {
  // Estado para controlar a visibilidade do modal de compra de ingressos.
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    // Seção principal da Home, com ID para navegação e classe para estilização.
    <section id="home" className="home-section">
      {/* Contêiner principal da Home, com a imagem de fundo definida via estilo inline. */}
      <div
        className="home-container"
        style={{ backgroundImage: `url(${parkBackground})` }}
      >
        {/* Contêiner para o conteúdo textual e o botão, alinhado dentro do home-container. */}
        <div className="home-content">
          {/* Contêiner específico para o texto da Home. */}
          <div className="home-text">
            {/* Parágrafo introdutório sobre as atrações. */}
            <p>Explore as incríveis atrações e divirta-se com sua família e amigos!</p>
            {/* Título principal de boas-vindas. */}
            <h1>Bem-vindo ao nosso Parque!</h1>
            {/* Parágrafo com texto de descrição do parque (lorem ipsum). */}
            <p>Lorem ipsum dolor sit amet. Ut maiores illum ab enim porro est corrupti repellat qui galisum sint ut quasi magni et eveniet rerum. Et velit veniam sed enim harum aut vero rerum qui unde autem qui quod veritatis et sequi sapiente.</p>

            {/* Div para agrupar o botão (útil para flexbox ou espaçamento). */}
            <div>
              {/* Botão de chamada para ação (CTA) para comprar ingressos.
                  Ao clicar, ele define 'mostrarModal' como true para exibir o modal. */}
              <button className="cta-button" onClick={() => setMostrarModal(true)}>
                Comprar ingressos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Renderiza o modal de compra de ingressos condicionalmente.
          Ele só será montado no DOM se 'mostrarModal' for true. */}
      {mostrarModal && (
        // Overlay do modal, que escurece o fundo e centraliza o modal.
        <div className="modal-overlay">
          {/* O componente CompraIngressosModal é renderizado aqui.
              Passa uma função 'onClose' para que o modal possa se fechar,
              definindo 'mostrarModal' como false. */}
          <CompraIngressosModal onClose={() => setMostrarModal(false)} />
        </div>
      )}
    </section>
  );
};

export default Home; // Exporta o componente Home para ser usado em outras partes da aplicação.