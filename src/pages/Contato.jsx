import React from "react";
import '../styles/Contato.css';

const Contato = () => {
  return (
    <section id="contato" className="home-section">
    <div className="contato-container">
      <header className="contato-header">
        <h1>Contato</h1>
        <p>Entre em contato conosco, ficaremos felizes em falar com você.</p>
      </header>
      <div className="form-container">
        <form>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Mensagem</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
    </section>
  );
};

export default Contato;