import React from 'react';
import './App.css';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Atracoes from './pages/Atracoes';
import Parcerias from './pages/Parcerias';
import TrabalheConosco from './pages/Trabalheconosco';
import Contato from './pages/Contato';
import Navbar from './components/Navbar';
import PetalasCanvas from './components/PetalasCanvas';

function App() {
  return (
    <>
      
      <div className="app-container">
        <PetalasCanvas /> {/* Fundo com pétalas */}
        <Navbar />  {/* Navegação acima do fundo */}
        <main className="content">
          <Home />
          <Sobre />
          <Parcerias />
          <Atracoes />
          <Contato />
          <TrabalheConosco />
        </main>
      </div>
    </>
  );
}

export default App;
