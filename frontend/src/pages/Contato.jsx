import React from "react"; // Importa a biblioteca React.
import '../styles/Contato.css'; // Importa os estilos CSS para este componente.

/**
 * Componente funcional Contato.
 * Este componente representa a seção de contato do site,
 * contendo um formulário para que os usuários possam enviar mensagens.
 *
 * @returns {JSX.Element} O elemento JSX que renderiza a seção de contato.
 */
const Contato = () => {
  return (
    // Seção principal de contato, com ID para navegação e classe para estilização.
    // A classe "home-section" pode ser usada para estilos de layout comuns entre seções.
    <section id="contato" className="home-section">
      {/* Contêiner principal para o conteúdo de contato. */}
      <div className="contato-container">
        {/* Cabeçalho da seção de contato. */}
        <header className="contato-header">
          {/* Título principal da seção. */}
          <h1>Contato</h1>
          {/* Parágrafo descritivo. */}
          <p>Entre em contato conosco, ficaremos felizes em falar com você.</p>
        </header>

        {/* Contêiner para o formulário, ajudando no layout e centralização. */}
        <div className="form-container">
          {/* Formulário de contato. */}
          <form>
            {/* Rótulo para o campo de nome. */}
            <label htmlFor="name">Nome</label>
            {/* Campo de entrada de texto para o nome. 'required' torna-o obrigatório. */}
            <input type="text" id="name" name="name" required />

            {/* Rótulo para o campo de email. */}
            <label htmlFor="email">Email</label>
            {/* Campo de entrada de email. 'required' torna-o obrigatório. */}
            <input type="email" id="email" name="email" required />

            {/* Rótulo para o campo de mensagem. */}
            <label htmlFor="message">Mensagem</label>
            {/* Área de texto para a mensagem. 'required' torna-o obrigatório. */}
            <textarea id="message" name="message" required></textarea>

            {/* Botão de envio do formulário. A classe "contato" é para estilização específica do botão. */}
            <button type="submit" className="contato">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contato; // Exporta o componente Contato para ser usado em outras partes da aplicação.