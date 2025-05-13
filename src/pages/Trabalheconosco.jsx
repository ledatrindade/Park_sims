import React from "react";
import "../styles/Trabalheconosco.css";

import simsIcon from "../assets/simsicon.svg";

const vagas = [
  {
    titulo: "Atendente",
    descricao: "Estamos contratando atendentes para diversas funções. Venha fazer parte do nosso time!",
    icon: simsIcon
  },
  {
    titulo: "Desenvolvedor Front-End",
    descricao: "Buscamos alguém com experiência em React.js e responsividade para criar interfaces incríveis.",
     icon: simsIcon
  },
  {
    titulo: "Designer Gráfico",
    descricao: "Se você domina Photoshop e Illustrator, queremos ver sua criatividade no nosso time!",
     icon: simsIcon
  },
  {
    titulo: "Analista de Marketing",
    descricao: "Ajude-nos a criar campanhas de impacto e elevar nossa presença digital.",
     icon: simsIcon
  },
];

const TrabalheConosco = () => {
  return (
    <section id="trabalhe" className="trabalhe-container">
      <h1>Trabalhe Conosco</h1>
      <p>Faça parte da nossa equipe!</p>
      <div className="vagas-wrapper">
        {vagas.map((vaga, index) => (
          <div
            key={index}
            className="vaga-card"
          >
            <div className="vaga-conteudo">
              <img src={vaga.icon} alt={vaga.titulo} className="vaga-icon" />
              <h2>{vaga.titulo}</h2>
              <p>{vaga.descricao}</p>
            </div>
            <div className="vaga-overlay">
              <button>Enviar Currículo</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrabalheConosco;
