// Importa os hooks useEffect e useRef do React.
// useEffect é usado para realizar efeitos colaterais em componentes funcionais,
// como manipulação do DOM, requisições de dados e configurações de eventos.
// useRef é usado para criar uma referência mutável que não causa re-renderizações
// quando seu valor é alterado, útil para acessar elementos do DOM ou manter valores
// que persistem entre renderizações.
import { useEffect, useRef } from 'react';

/**
 * Componente funcional PetalasCanvas.
 * Este componente cria e gerencia um canvas HTML que simula a queda de pétalas
 * com um efeito de vento suave, utilizando a API de Canvas 2D.
 *
 * @returns {JSX.Element} O elemento JSX que representa o canvas animado.
 */
const PetalasCanvas = () => {
  // Cria uma referência para o elemento <canvas> no DOM.
  // Será usada para acessar o contexto de desenho do canvas.
  const canvasRef = useRef(null);
  // Cria uma referência mutável para armazenar o array de objetos Petala.
  // Usar useRef garante que o array persista entre as re-renderizações do componente.
  const petalas = useRef([]);

  /**
   * Hook useEffect para inicializar e gerenciar a animação do canvas.
   * Este efeito é executado apenas uma vez, após a montagem inicial do componente,
   * pois possui um array de dependências vazio `[]`.
   */
  useEffect(() => {
    // Acessa o elemento canvas do DOM através da referência.
    const canvas = canvasRef.current;
    // Obtém o contexto de desenho 2D do canvas.
    const ctx = canvas.getContext('2d');

    // Define o tamanho real (resolução) do canvas para corresponder às dimensões da janela.
    // Isso evita que o desenho fique pixelizado em telas de alta densidade.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Array de cores pré-definidas para as pétalas.
    const cores = ['#b8f3ce', '#a3f0df', '#a9e7f2', '#c9f5b8'];

    /**
     * Classe Petala.
     * Representa uma única pétala no canvas, com suas propriedades de posição,
     * tamanho, cor, velocidade e movimento.
     */
    class Petala {
      constructor() {
        // Inicializa as propriedades da pétala ao ser criada.
        this.reset();
      }

      /**
       * Reinicializa as propriedades da pétala, usada para a criação inicial
       * e quando a pétala sai da tela e precisa ser "resetada" no topo.
       */
      reset() {
        // Posição X aleatória dentro da largura do canvas.
        this.x = Math.random() * canvas.width;
        // Posição Y aleatória acima da tela, para simular que está caindo.
        this.y = Math.random() * -canvas.height;
        // Raio da pétala, ligeiramente aleatório para variação no tamanho.
        this.radius = 4 + Math.random() * 4;
        // Seleciona uma cor aleatória do array 'cores'.
        this.color = cores[Math.floor(Math.random() * cores.length)];
        // Velocidade de queda da pétala (componente vertical). Reduzida para um movimento mais lento.
        this.speed = 0.2 + Math.random() * 0.6;
        // Componente de vento, que adiciona um movimento lateral aleatório.
        this.wind = 0.5 - Math.random(); // Valor entre -0.5 e 0.5 para movimento para esquerda/direita.
        // Velocidade horizontal (vx) baseada no vento.
        this.vx = this.wind;
        // Velocidade vertical (vy) baseada na velocidade de queda.
        this.vy = this.speed;
      }

      /**
       * Desenha a pétala no canvas.
       */
      draw() {
        // Inicia um novo caminho de desenho.
        ctx.beginPath();
        // Desenha uma elipse para simular a forma de uma pétala.
        // Parâmetros: (x, y, raioX, raioY, rotação, ânguloInicial, ânguloFinal)
        ctx.ellipse(this.x, this.y, this.radius, this.radius / 2, Math.PI / 4, 0, 2 * Math.PI);
        // Define a cor de preenchimento da pétala.
        ctx.fillStyle = this.color;
        // Preenche a forma da pétala.
        ctx.fill();
      }

      /**
       * Atualiza a posição da pétala para simular o movimento de queda e vento.
       * Se a pétala sair da tela, ela é reinicializada no topo.
       */
      update() {
        // Atualiza a posição X com a velocidade horizontal.
        this.x += this.vx;
        // Atualiza a posição Y com a velocidade vertical.
        this.y += this.vy;
        // Verifica se a pétala saiu da tela (abaixo, ou fora das laterais).
        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
          // Se saiu, reinicializa suas propriedades.
          this.reset();
          // Garante que a pétala reinicie sempre no topo da tela.
          this.y = 0;
        }
      }
    }

    // Gerar e popular o array de pétalas.
    // Cria 100 instâncias da classe Petala e as adiciona ao array `petalas.current`.
    for (let i = 0; i < 100; i++) {
      petalas.current.push(new Petala());
    }

    /**
     * Função de animação principal.
     * Esta função é chamada repetidamente para criar a ilusão de movimento.
     */
    const animate = () => {
      // Limpa todo o canvas na cada quadro de animação.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Para cada pétala no array:
      petalas.current.forEach((p) => {
        // Atualiza a posição da pétala.
        p.update();
        // Desenha a pétala em sua nova posição.
        p.draw();
      });

      // Solicita ao navegador para agendar a próxima chamada desta função de animação.
      // Isso otimiza a renderização e sincroniza com a taxa de atualização da tela.
      requestAnimationFrame(animate);
    };

    // Inicia o loop de animação.
    animate();
  }, []); // Array de dependências vazio, o efeito roda apenas uma vez após a montagem.

  return (
    // Renderiza o elemento <canvas>.
    <canvas
      // Atribui a referência `canvasRef` ao elemento canvas para que possamos acessá-lo no useEffect.
      ref={canvasRef}
      // Adiciona uma classe CSS para estilização (se houver).
      className="petalas-canvas"
      // Estilos inline para o canvas.
      style={{
        background: 'linear-gradient(to right, #3aa8b5, #48d88b)', // Gradiente de fundo
        position: 'fixed', // Fixa o canvas na janela de visualização
        top: 0, // Alinha ao topo
        left: 0, // Alinha à esquerda
        width: '100vw', // Ocupa 100% da largura da viewport
        height: '100vh', // Ocupa 100% da altura da viewport
        pointerEvents: 'none', // Permite que cliques e interações passem através do canvas para os elementos abaixo
      }}
    />
  );
};

// Exporta o componente PetalasCanvas para que ele possa ser usado em outras partes da aplicação.
export default PetalasCanvas;