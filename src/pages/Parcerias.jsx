import React from "react";
import "../styles/Parcerias.css";

import par1 from "../assets/par1.png";
import par2 from "../assets/par2.png";

const Parcerias = () => {
  return (
    <section id="parcerias" className="parcerias-section">
      <div className="parcerias-container">
        <header className="parcerias-header">
          <h1>Nossas Parcerias</h1>
          <p>Veja com quem trabalhamos para oferecer o melhor.</p>
        </header>

        <div className="parceria-bloco" style={{ backgroundImage: `url(${par1})` }}>
          <div className="conteudo">
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>Lorem ipsum dolor sit amet. Ut maiores illum ab enim porro est corrupti repellat qui galisum sint ut quasi magni et eveniet rerum. Et velit veniam sed enim harum aut vero rerum qui unde autem qui quod veritatis et sequi sapiente.</p>
          </div>
        </div>

        <div className="parceria-bloco" style={{ backgroundImage: `url(${par2})` }}>
          <div className="conteudo">
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>Lorem ipsum dolor sit amet. Ut maiores illum ab enim porro est corrupti repellat qui galisum sint ut quasi magni et eveniet rerum. Et velit veniam sed enim harum aut vero rerum qui unde autem qui quod veritatis et sequi sapiente.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Parcerias;
