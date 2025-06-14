// Importa a biblioteca React, necessária para criar componentes React.
import React from "react";
// Importa o arquivo CSS específico para estilizar o componente Footer.
import "./Footer.css";

/**
 * Componente funcional Footer.
 * Este componente representa o rodapé da aplicação, exibindo informações de direitos autorais.
 * @returns {JSX.Element} O elemento JSX que representa o rodapé.
 */
export default function Footer() {
  return (
    // O elemento footer HTML, que receberá as estilizações da classe "footer".
    <footer className="footer">
      {/* Parágrafo contendo o texto de direitos autorais e o ano atual. */}
      <p>© Park Sims 2025 — Todos os direitos reservados.</p>
    </footer>
  );
}