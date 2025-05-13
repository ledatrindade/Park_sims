// src/pages/Sobre.jsx
import React, { useState } from 'react';
import "../styles/Sobre.css"; // Certifique-se de que o caminho está correto
import iconColaboradores from "../assets/colaboradores.svg";
import iconBrinquedos from "../assets/brinquedos.svg";
import iconCriadores from "../assets/criadores.svg";

const cards = [
  {
    id: 'colaboradores',
    title: 'Colaboradores',
    icon: <img src={iconColaboradores} alt="Colaboradores" className="icon-img" style={{ width: "90px", height: "80px" }} />
  },
  {
    id: 'brinquedos',
    title: 'Brinquedos',
    icon: <img src={iconBrinquedos} alt="Brinquedos" className="icon-img" style={{ width: "90px", height: "80px" }} />
  },
  {
    id: 'criadores',
    title: 'Criadores do ParkSims',
    icon: <img src={iconCriadores} alt="Criadores" className="icon-img" style={{ width: "90px", height: "80px" }} />
  },
];

const sectionContent = {
  colaboradores: {
    image: 'src/assets/colaboradores.jpg',
    title: 'Nossa Equipe',
    subtitle: 'Trabalhando com paixão',
   text: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur. Est facere dignissimos et atque veniam aut ipsa officiis. Aut voluptate nihil ab natus quis non aliquam recusandae aut voluptas quia ut fugit iste. Id quaerat voluptas et ipsum quam At suscipit ducimus. Sit totam voluptatem 33 dolores cupiditate ad ipsa incidunt et nulla quasi est asperiores harum! '
  },
  brinquedos: {
    image: 'src/assets/brinsims.jpg',
    title: 'Atrações Incríveis',
    subtitle: 'Diversão para todas as idades',
   text: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur. Est facere dignissimos et atque veniam aut ipsa officiis. Aut voluptate nihil ab natus quis non aliquam recusandae aut voluptas quia ut fugit iste. Id quaerat voluptas et ipsum quam At suscipit ducimus. Sit totam voluptatem 33 dolores cupiditate ad ipsa incidunt et nulla quasi est asperiores harum! '
  },
  criadores: {
    image: 'src/assets/criadores.jpg',
    title: 'Idealizadores do Sonho',
    subtitle: 'Visão e Inovação',
    text: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur. Est facere dignissimos et atque veniam aut ipsa officiis. Aut voluptate nihil ab natus quis non aliquam recusandae aut voluptas quia ut fugit iste. Id quaerat voluptas et ipsum quam At suscipit ducimus. Sit totam voluptatem 33 dolores cupiditate ad ipsa incidunt et nulla quasi est asperiores harum! '
  }
};

export default function Sobre() {
  const [selected, setSelected] = useState('colaboradores'); // Já inicia com o card aberto

  return (
    <section id="sobre" className="home-section">
      <div className="sobre-container">
        <header className="sobre-header">
          <h1>Sobre Nós</h1>
          <p>Conheça quem imaginou e criou o mundo mágico do ParkSims, tornando sonhos realidade.</p>
        </header>

        <div className="cards-wrapper">
          {cards.map((card) => (
            <div
              key={card.id}
              className="sobre-card"
              onClick={() => setSelected(card.id)}
            >
              <div className="overlay">
                <span className="icon">{card.icon}</span>
                <h3>{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="card-info">
            <img
              src={sectionContent[selected].image}
              alt={sectionContent[selected].title}
            />
            <div className="info-text">
              <h2>{sectionContent[selected].title}</h2>
              <h4>{sectionContent[selected].subtitle}</h4>
              <p>{sectionContent[selected].text}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
