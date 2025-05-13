// src/pages/Atracoes.jsx
import React from 'react';
import '../styles/atracoes.css';

import atracao1 from '../assets/atracao1.png';
import atracao2 from '../assets/atracao2.png';
import atracao3 from '../assets/atracao3.png';
import atracao4 from '../assets/atracao4.png';

const atracoes = [
  {
    id: 'montanha-russa',
    title: 'Montanha-Russa',
    description: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur.',
    image: atracao1
  },
  {
    id: 'carrossel',
    title: 'Carrossel',
    description: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur.',
    image: atracao2
  },
  {
    id: 'simulador',
    title: 'Roda Gigante',
    description: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur.',
    image: atracao3
  },
  {
    id: 'atracao4',
    title: 'Castelo Encantado',
    description: 'Lorem ipsum dolor sit amet. Sit velit consequatur aut saepe soluta et magnam aspernatur qui sint doloribus? Et consequatur quos in architecto sint ea rerum officiis est veritatis aliquid vel dolore illo vel deserunt dignissimos et quam tenetur.',
    image: atracao4
  }
];


export default function Atracoes() {
  return (
   <section id="atracoes" className="atracoes-container">
  <header className="atracoes-header">
    <h1>Atrações</h1>
    <p>Descubra as experiências incríveis que o ParkSims preparou para você!</p>
  </header>

  <div className="cards-wrapper">
    {atracoes.map((atracao) => (
      <div
        key={atracao.id}
        className="atracao-card"
        style={{ backgroundImage: `url(${atracao.image})` }}
      >
        <div className="overlay">
          <h3>{atracao.title}</h3>
          <p style={{ padding: "0 1rem", textAlign: "center" }}>{atracao.description}</p>
          <button>Comprar Ingresso</button>
        </div>
      </div>
    ))}
  </div>
</section>

  );
}
