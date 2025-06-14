// src/pages/TrabalheConosco.jsx

// Importa a biblioteca React.
import React from "react";
// Importa o arquivo CSS para estilização específica do componente TrabalheConosco.
import "../styles/Trabalheconosco.css";

// Importa o ícone dos Sims. Este ícone será usado para todas as vagas.
import simsIcon from "../assets/simsicon.svg";

// Importa imagens específicas para cada tipo de vaga (SUGESTÃO: se quiser fundos diferentes).
// Para usar estas imagens, você precisaria atribuí-las ao campo 'image' em cada objeto de vaga.
// import vagaAtendenteImg from "../assets/vaga_atendente.jpg";
// import vagaDesenvolvedorImg from "../assets/vaga_desenvolvedor.jpg";
// import vagaDesignerImg from "../assets/vaga_designer.jpg";
// import vagaMarketingImg from "../assets/vaga_marketing.jpg";

// Array de objetos que representa as vagas disponíveis.
// Cada objeto contém um título, descrição e o ícone associado.
const vagas = [
  {
    titulo: "Atendente",
    descricao: "Estamos contratando atendentes para diversas funções. Venha fazer parte do nosso time!",
    icon: simsIcon,
    // SUGESTÃO: Se quiser uma imagem de fundo diferente por card, adicione aqui:
    // image: vagaAtendenteImg
  },
  {
    titulo: "Desenvolvedor Front-End",
    descricao: "Buscamos alguém com experiência em React.js e responsividade para criar interfaces incríveis.",
    icon: simsIcon,
    // image: vagaDesenvolvedorImg
  },
  {
    titulo: "Designer Gráfico",
    descricao: "Se você domina Photoshop e Illustrator, queremos ver sua criatividade no nosso time!",
    icon: simsIcon,
    // image: vagaDesignerImg
  },
  {
    titulo: "Analista de Marketing",
    descricao: "Ajude-nos a criar campanhas de impacto e elevar nossa presença digital.",
    icon: simsIcon,
    // image: vagaMarketingImg
  },
];

/**
 * Componente funcional TrabalheConosco.
 * Esta seção exibe as oportunidades de carreira disponíveis no parque,
 * apresentando cada vaga em um card com um overlay interativo.
 *
 * @returns {JSX.Element} O elemento JSX que renderiza a seção "Trabalhe Conosco".
 */
const TrabalheConosco = () => {
  return (
    // Seção principal "Trabalhe Conosco", com ID para navegação (ancoragem)
    // e uma classe CSS para estilização geral da seção.
    <section id="trabalhe" className="trabalhe-container">
      {/* Título principal da seção. */}
      <h1>Trabalhe Conosco</h1>
      {/* Parágrafo descritivo, introduzindo a seção. */}
      <p>Faça parte da nossa equipe!</p>

      {/* Contêiner para os cards de vagas, usando Flexbox para layout. */}
      <div className="vagas-wrapper">
        {/* Mapeia o array 'vagas' para renderizar um card para cada vaga. */}
        {vagas.map((vaga, index) => (
          // Div que representa um card de vaga individual.
          // A 'key' é essencial para o React otimizar a renderização de listas.
          // O 'index' é usado como key aqui. Em um cenário real, se as vagas pudessem
          // ser reordenadas ou filtradas, seria melhor usar um ID único da vaga.
          // O estilo de fundo pode ser definido dinamicamente se você adicionar 'image' ao objeto vaga.
          <div
            key={index}
            className="vaga-card"
            // SUGESTÃO: Se adicionar 'image' ao objeto vaga, descomente a linha abaixo:
            // style={{ backgroundImage: `url(${vaga.image})` }}
          >
            {/* Contêiner para o conteúdo principal da vaga (título, descrição, ícone). */}
            <div className="vaga-conteudo">
              {/* Ícone da vaga. O 'alt' text é dinâmico com o título da vaga. */}
              <img src={vaga.icon} alt={vaga.titulo} className="vaga-icon" />
              {/* Título da vaga. */}
              <h2>{vaga.titulo}</h2>
              {/* Descrição da vaga. */}
              <p>{vaga.descricao}</p>
            </div>
            {/* Overlay que aparece ao passar o mouse sobre o card. */}
            <div className="vaga-overlay">
              {/* Botão para enviar currículo. */}
              <button>Enviar Currículo</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Exporta o componente TrabalheConosco para que possa ser utilizado em outras partes da aplicação.
export default TrabalheConosco;