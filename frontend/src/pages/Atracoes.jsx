// src/pages/Atracoes.jsx

// Importa React e o hook useState para gerenciar o estado do componente.
import React, { useState } from 'react';
// Importa os estilos CSS específicos para a seção de atrações.
import '../styles/atracoes.css';
// Importa o componente modal para compra de ingressos.
import CompraIngressosModal from '../components/CompraIngressosModal';

// Importa as imagens das atrações.
import atracao1 from '../assets/atracao1.png';
import atracao2 from '../assets/atracao2.png';
import atracao3 from '../assets/atracao3.png';
import atracao4 from '../assets/atracao4.png';

// Array de objetos que representa os dados de cada atração.
// Cada objeto contém um ID único, título, descrição e o caminho da imagem.
const atracoes = [
  { id: 'montanha-russa', title: 'Montanha-Russa', description: 'Experimente a emoção de loopings e quedas radicais nesta montanha-russa de tirar o fôlego!', image: atracao1 },
  { id: 'carrossel', title: 'Carrossel', description: 'Um clássico atemporal que encanta crianças e adultos com suas cores e música.', image: atracao2 },
  { id: 'simulador', title: 'Roda Gigante', description: 'Desfrute de vistas panorâmicas espetaculares do ParkSims do alto da nossa majestosa Roda Gigante.', image: atracao3 },
  { id: 'atracao4', title: 'Castelo Encantado', description: 'Entre em um mundo de fantasia e magia, explorando os segredos do Castelo Encantado.', image: atracao4 }
];

/**
 * Componente Atracoes.
 * Esta página exibe uma lista de atrações do parque, permitindo que o usuário
 * visualize detalhes e abra um modal para compra de ingressos.
 *
 * @returns {JSX.Element} O elemento JSX que renderiza a página de atrações.
 */
export default function Atracoes() {
  // Estado para controlar a visibilidade do modal de compra de ingressos.
  const [mostrarModal, setMostrarModal] = useState(false);
  // Estado para armazenar os dados da atração que foi selecionada para compra.
  const [atracaoSelecionada, setAtracaoSelecionada] = useState(null);

  /**
   * Função para abrir o modal de compra de ingressos.
   * @param {object} atracao - O objeto da atração que foi clicada.
   */
  const abrirModal = (atracao) => {
    // Define a atração selecionada no estado.
    setAtracaoSelecionada(atracao);
    // Define `mostrarModal` como true para exibir o modal.
    setMostrarModal(true);
  };

  /**
   * Função para fechar o modal de compra de ingressos.
   */
  const fecharModal = () => {
    // Define `mostrarModal` como false para ocultar o modal.
    setMostrarModal(false);
    // Limpa a atração selecionada do estado.
    setAtracaoSelecionada(null);
  };

  return (
    // Fragmento React para agrupar múltiplos elementos sem adicionar um nó extra ao DOM.
    <>
      {/* Seção principal das atrações com um ID para navegação e classe para estilização. */}
      <section id="atracoes" className="atracoes-container">
        {/* Cabeçalho da seção de atrações. */}
        <header className="atracoes-header">
          {/* Título principal da seção. */}
          <h1>Atrações</h1>
          {/* Parágrafo descritivo da seção. */}
          <p>Descubra as experiências incríveis que o ParkSims preparou para você!</p>
        </header>

        {/* Contêiner para os cards das atrações, usando Flexbox para layout. */}
        <div className="cards-wrapper">
          {/* Mapeia o array 'atracoes' para renderizar um card para cada atração. */}
          {atracoes.map((atracao) => (
            // Div que representa um card de atração individual.
            // A 'key' é essencial para o React otimizar a renderização de listas.
            // O estilo de fundo é definido dinamicamente usando a imagem da atração.
            <div
              key={atracao.id}
              className="atracao-card"
              style={{ backgroundImage: `url(${atracao.image})` }}
            >
              {/* Overlay que aparece ao passar o mouse sobre o card. */}
              <div className="overlay">
                {/* Título da atração dentro do overlay. */}
                <h3>{atracao.title}</h3>
                {/* Descrição da atração dentro do overlay. */}
                <p style={{ padding: "0 1rem", textAlign: "center" }}>{atracao.description}</p>
                {/* Botão para abrir o modal de compra de ingressos, passando a atração atual. */}
                <button onClick={() => abrirModal(atracao)}>Comprar Ingresso</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Renderiza o CompraIngressosModal condicionalmente.
          Ele só será montado no DOM se 'mostrarModal' for true. */}
      {mostrarModal && (
        <CompraIngressosModal
          atracao={atracaoSelecionada} // Passa os dados da atração selecionada para o modal.
          onClose={fecharModal}       // Passa a função 'fecharModal' para o modal poder se fechar.
        />
      )}
    </>
  );
}