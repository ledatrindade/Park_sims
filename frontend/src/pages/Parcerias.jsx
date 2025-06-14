// src/pages/Parcerias.jsx

// Importa a biblioteca React.
import React from "react";
// Importa o arquivo CSS para estilização específica do componente Parcerias.
import "../styles/Parcerias.css";

// Importa as imagens das parcerias.
import par1 from "../assets/par1.png";
import par2 from "../assets/par2.png";

/**
 * Componente funcional Parcerias.
 * Este componente exibe uma seção dedicada às parcerias do parque,
 * apresentando blocos de conteúdo com imagens de fundo e texto descritivo.
 *
 * @returns {JSX.Element} O elemento JSX que renderiza a seção de parcerias.
 */
const Parcerias = () => {
  return (
    // Seção principal de parcerias, com um ID para navegação (ancoragem)
    // e uma classe CSS para estilização geral da seção.
    <section id="parcerias" className="parcerias-section">
      {/* Contêiner principal para o conteúdo da seção de parcerias. */}
      <div className="parcerias-container">
        {/* Cabeçalho da seção de parcerias. */}
        <header className="parcerias-header">
          {/* Título principal da seção. */}
          <h1>Nossas Parcerias</h1>
          {/* Parágrafo descritivo, explicando o propósito da seção. */}
          <p>Veja com quem trabalhamos para oferecer o melhor.</p>
        </header>

        {/* Bloco de parceria individual.
            A imagem de fundo é definida dinamicamente via estilo inline. */}
        <div className="parceria-bloco" style={{ backgroundImage: `url(${par1})` }}>
          {/* Contêiner para o conteúdo textual dentro do bloco de parceria. */}
          <div className="conteudo">
            {/* Título do bloco de parceria (placeholder Lorem Ipsum). */}
            <h2>Lorem ipsum dolor sit amet.</h2>
            {/* Parágrafo descritivo do bloco de parceria (placeholder Lorem Ipsum). */}
            <p>Lorem ipsum dolor sit amet. Ut maiores illum ab enim porro est corrupti repellat qui galisum sint ut quasi magni et eveniet rerum. Et velit veniam sed enim harum aut vero rerum qui unde autem qui quod veritatis et sequi sapiente.</p>
          </div>
        </div>

        {/* Segundo bloco de parceria, seguindo o mesmo padrão do primeiro. */}
        <div className="parceria-bloco" style={{ backgroundImage: `url(${par2})` }}>
          {/* Contêiner para o conteúdo textual do segundo bloco. */}
          <div className="conteudo">
            {/* Título do segundo bloco. */}
            <h2>Lorem ipsum dolor sit amet.</h2>
            {/* Parágrafo descritivo do segundo bloco. */}
            <p>Lorem ipsum dolor sit amet. Ut maiores illum ab enim porro est corrupti repellat qui galisum sint ut quasi magni et eveniet rerum. Et velit veniam sed enim harum aut vero rerum qui unde autem qui quod veritatis et sequi sapiente.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporta o componente Parcerias para que possa ser utilizado em outras partes da aplicação.
export default Parcerias;