import { useEffect, useRef } from 'react';

const PetalasCanvas = () => {
  const canvasRef = useRef(null);
  const petalas = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Define o tamanho real do canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cores = ['#b8f3ce', '#a3f0df', '#a9e7f2', '#c9f5b8'];

    class Petala {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.radius = 4 + Math.random() * 4;
        this.color = cores[Math.floor(Math.random() * cores.length)];
        // A velocidade foi reduzida para tornar as pétalas mais lentas
        this.speed = 0.2 + Math.random() * 0.6;  // Ajuste a velocidade aqui para caírem mais devagar
        this.wind = 0.5 - Math.random();
        this.vx = this.wind;
        this.vy = this.speed;
      }

      draw() {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius / 2, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = 0;
        }
      }
    }

    // Gerar as pétalas
    for (let i = 0; i < 100; i++) {
      petalas.current.push(new Petala());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalas.current.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="petalas-canvas"
      style={{
        background: 'linear-gradient(to right, #3aa8b5, #48d88b)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // Permite interação com outros elementos da página
      }}
    />
  );
};

export default PetalasCanvas;
