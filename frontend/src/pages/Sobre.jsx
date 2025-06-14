// src/pages/Sobre.jsx

// Importa React e o hook useState para gerenciar o estado do componente.
import React, { useState } from 'react';
// Importa o arquivo CSS para estilização específica do componente Sobre.
import "../styles/Sobre.css";

// Importa os ícones SVG para os cards.
import iconColaboradores from "../assets/colaboradores.svg";
import iconBrinquedos from "../assets/brinquedos.svg";
import iconCriadores from "../assets/criadores.svg";

// Dados para os cards de navegação da seção "Sobre".
// Cada objeto representa um card com seu ID, título e o ícone correspondente.
const cards = [
  {
    id: 'colaboradores',
    title: 'Colaboradores',
    // O ícone é renderizado diretamente como JSX.
    // Estilos inline são aplicados para tamanho, mas podem ser movidos para o CSS se forem comuns.
    icon: <img src={iconColaboradores} alt="Ícone de Colaboradores" className="icon-img" style={{ width: "90px", height: "80px" }} />
  },
  {
    id: 'brinquedos',
    title: 'Brinquedos',
    icon: <img src={iconBrinquedos} alt="Ícone de Brinquedos" className="icon-img" style={{ width: "90px", height: "80px" }} />
  },
  {
    id: 'criadores',
    title: 'Criadores do ParkSims',
    icon: <img src={iconCriadores} alt="Ícone de Criadores" className="icon-img" style={{ width: "90px", height: "80px" }} />
  },
];


const sectionContent = {
  colaboradores: {
    image: 'src/assets/colaboradores.jpg', // Caminho da imagem para colaboradores
    title: 'Nossa Equipe',
    subtitle: 'Trabalhando com paixão',
    text: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur. Est facere dignissimos et atque veniam aut ipsa officiis. Aut voluptate nihil ab natus quis non aliquam recusandae aut voluptas quia ut fugit iste. Id quaerat voluptas et ipsum quam At suscipit ducimus. Sit totam voluptatem 33 dolores cupiditate ad ipsa incidunt et nulla quasi est asperiores harum! '
  },
  brinquedos: {
    image: 'src/assets/brinsims.jpg', // Caminho da imagem para brinquedos
    title: 'Atrações Incríveis',
    subtitle: 'Diversão para todas as idades',
    text: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur. Est facere dignissimos et atque veniam aut ipsa officiis. Aut voluptate nihil ab natus quis non aliquam recusandae aut voluptas quia ut fugit iste. Id quaerat voluptas et ipsum quam At suscipit ducimus. Sit totam voluptatem 33 dolores cupiditate ad ipsa incidunt et nulla quasi est asperiores harum! '
  },
  criadores: {
    image: 'src/assets/criadores.jpg', // Caminho da imagem para criadores
    title: 'Idealizadores do Sonho',
    subtitle: 'Visão e Inovação',
    text: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur. Est facere dignissimos et atque veniam aut ipsa officiis. Aut voluptate nihil ab natus quis non aliquam recusandae aut voluptas quia ut fugit iste. Id quaerat voluptas et ipsum quam At suscipit ducimus. Sit totam voluptatem 33 dolores cupiditate ad ipsa incidunt et nulla quasi est asperiores harum! '
  }
};

/**
 * Componente funcional Sobre.
 * Esta página apresenta informações sobre o parque, divididas em seções
 * clicáveis (Colaboradores, Brinquedos, Criadores) que revelam conteúdo detalhado.
 *
 * @returns {JSX.Element} O elemento JSX que renderiza a seção "Sobre Nós".
 */
export default function Sobre() {
  // Estado para controlar qual card está selecionado/ativo.
  // Inicia com 'colaboradores' para que uma seção já esteja aberta por padrão.
  const [selected, setSelected] = useState('colaboradores');

  return (
    // Seção principal "Sobre Nós", com ID para ancoragem e classe para estilização.
    <section id="sobre" className="sobre-section">
      {/* Contêiner principal para o conteúdo da seção "Sobre". */}
      <div className="sobre-container">
        {/* Cabeçalho da seção "Sobre". */}
        <header className="sobre-header">
          {/* Título principal da seção. */}
          <h1>Sobre Nós</h1>
          {/* Parágrafo descritivo da seção. */}
          <p>Conheça quem imaginou e criou o mundo mágico do ParkSims, tornando sonhos realidade.</p>
        </header>

        {/* Contêiner para os cards clicáveis (Colaboradores, Brinquedos, Criadores). */}
        <div className="cards-wrapper">
          {/* Mapeia o array 'cards' para renderizar cada card. */}
          {cards.map((card) => (
            // Div que representa um card individual.
            // A 'key' é essencial para o React otimizar a renderização de listas.
            // A classe 'sobre-card' é para estilização geral.
            // O 'onClick' atualiza o estado 'selected' para o ID do card clicado.
            <div
              key={card.id}
              className="sobre-card"
              onClick={() => setSelected(card.id)}
            >
              {/* Overlay que aparece sobre o card (inicialmente oculto, visível ao hover). */}
              <div className="overlay">
                {/* Ícone do card (passado como JSX na definição de 'cards'). */}
                <span className="icon">{card.icon}</span>
                {/* Título do card. */}
                <h3>{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bloco de informações detalhadas que aparece quando um card é selecionado. */}
        {/* Só é renderizado se 'selected' não for nulo/falso. */}
        {selected && (
          <div className="card-info">
            {/* Imagem da seção selecionada.
            */}
            <img
              src={sectionContent[selected].image}
              alt={sectionContent[selected].title} // Alt text para acessibilidade
            />
            {/* Contêiner para o texto detalhado da seção. */}
            <div className="info-text">
              {/* Título da seção selecionada. */}
              <h2>{sectionContent[selected].title}</h2>
              {/* Subtítulo da seção selecionada. */}
              <h4>{sectionContent[selected].subtitle}</h4>
              {/* Parágrafo de texto detalhado da seção selecionada. */}
              <p>{sectionContent[selected].text}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}