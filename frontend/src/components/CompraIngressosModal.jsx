// Importa os hooks useState e useEffect do React para gerenciar o estado e efeitos colaterais
import React, { useState, useEffect } from 'react';
// Importa o arquivo CSS para estilização do modal
import './CompraIngressosModal.css';

/**
 * Função utilitária para validar o formato de um endereço de e-mail.
 * Usa uma expressão regular simples para verificar se o e-mail tem um formato básico válido.
 * @param {string} email - O endereço de e-mail a ser validado.
 * @returns {boolean} - Retorna true se o e-mail for válido, false caso contrário.
 */
const validarEmail = (email) => {
  // Expressão regular para validar e-mails (verifica a presença de '@' e '.')
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Componente funcional CompraIngressosModal.
 * Gerencia o fluxo de compra de ingressos em um modal de múltiplos passos.
 * @param {object} props - As propriedades passadas para o componente.
 * @param {function} props.onClose - Função para fechar o modal.
 */
const CompraIngressosModal = ({ onClose }) => {
  // Estado para controlar a etapa atual do processo de compra (1, 2, 3 ou 4)
  const [step, setStep] = useState(1);
  // Estado para indicar se alguma operação está carregando (ex: envio de formulário)
  const [loading, setLoading] = useState(false);
  // Estado para armazenar os preços dos diferentes tipos de ingressos (inteira, estudante, vip)
  const [precosIngressos, setPrecosIngressos] = useState({
    inteira: 0,
    estudante: 0,
    vip: 0,
  });

  // Estado para armazenar os dados do formulário, incluindo informações do comprador e dos ingressos
  const [formData, setFormData] = useState({
    dia: '', // Data da visita selecionada
    email: '', // E-mail do comprador
    ingressosQtd: { // Quantidade de cada tipo de ingresso
      inteira: 0,
      estudante: 0,
      vip: 0,
    },
    ingressos: [], // Array para armazenar detalhes de cada ingresso (nome, cpf, tipo)
  });

  /**
   * Hook useEffect para buscar os preços dos ingressos do backend
   * quando o componente é montado.
   */
  useEffect(() => {
    console.log('useEffect de fetchPrecos iniciado');
    async function fetchPrecos() {
      try {
        // Faz uma requisição GET para a API que fornece os tipos de ingressos
        const res = await fetch('http://localhost:3000/api/ticket-types');
        console.log('Resposta fetch:', res);
        // Converte a resposta para JSON
        const data = await res.json();
        console.log('Preços recebidos do backend:', data);
        // Inicializa um objeto para armazenar os preços formatados
        const precos = { inteira: 0, estudante: 0, vip: 0 };
        // Itera sobre os dados recebidos para popular o objeto 'precos'
        data.forEach(({ tipo, preco }) => {
          // Converte o tipo para minúsculas para corresponder às chaves do objeto 'precos'
          const key = tipo.toLowerCase();
          // Converte o preço para float e atribui, ou 0 se for inválido
          precos[key] = parseFloat(preco) || 0;
        });
        // Atualiza o estado 'precosIngressos' com os preços obtidos
        setPrecosIngressos(precos);
      } catch (error) {
        // Em caso de erro na requisição, loga o erro no console
        console.error('Erro ao buscar preços:', error);
      }
    }
    // Chama a função fetchPrecos ao montar o componente
    fetchPrecos();
    // O array de dependências vazio [] garante que este efeito só é executado uma vez (ao montar)
  }, []);

  /**
   * Exibe uma mensagem de erro em um "toast" (notificação temporária).
   * @param {string} mensagem - A mensagem de erro a ser exibida.
   */
  const mostrarToastErro = (mensagem) => {
    // Cria um novo elemento div para o toast
    const toast = document.createElement('div');
    // Adiciona classes CSS para estilização e tipo de erro
    toast.className = 'toast toast-error';
    // Define o texto do toast
    toast.textContent = mensagem;

    // Adiciona o toast ao corpo do documento
    document.body.appendChild(toast);

    // Define um timeout para iniciar o fade-out do toast após 2.7 segundos
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2700);

    // Define um timeout para remover o toast do DOM após 3 segundos (tempo total)
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  /**
   * Função auxiliar para exibir mensagens de erro, chamando mostrarToastErro.
   * @param {string} mensagem - A mensagem de erro.
   */
  const mostrarErro = (mensagem) => {
    mostrarToastErro(mensagem);
  };

  /**
   * Exibe uma mensagem de sucesso em um "toast" (notificação temporária).
   * Funcionalidade similar a mostrarToastErro, mas com estilo de sucesso.
   * @param {string} mensagem - A mensagem de sucesso a ser exibida.
   */
  const mostrarToastSucesso = (mensagem) => {
    // Cria um novo elemento div para o toast
    const toast = document.createElement('div');
    // Adiciona classes CSS para estilização e tipo de sucesso
    toast.className = 'toast toast-success';
    // Define o texto do toast
    toast.textContent = mensagem;

    // Adiciona o toast ao corpo do documento
    document.body.appendChild(toast);

    // Define um timeout para iniciar o fade-out do toast após 2.7 segundos
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2700);

    // Define um timeout para remover o toast do DOM após 3 segundos (tempo total)
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  /**
   * Lida com o avanço da Etapa 1 para a Etapa 2.
   * Valida os campos de data e e-mail antes de prosseguir.
   */
  const handleStep1Next = () => {
    // Valida se a data da visita foi preenchida
    if (!formData.dia) {
      mostrarErro('⚠️ Preencha a data da visita.');
      return;
    }
    // Valida se o e-mail foi preenchido
    if (!formData.email) {
      mostrarErro('⚠️ Preencha o email.');
      return;
    }
    // Valida o formato do e-mail usando a função validarEmail
    if (!validarEmail(formData.email)) {
      mostrarErro('⚠️ Email inválido. Digite um email válido.');
      return;
    }
    // Se todas as validações passarem, avança para a Etapa 2
    setStep(2);
  };

  /**
   * Lida com o avanço da Etapa 2 para a Etapa 3.
   * Valida se pelo menos um ingresso foi selecionado e prepara os dados dos ingressos.
   */
  const handleStep2Next = () => {
    // Desestrutura as quantidades de ingressos do formData
    const { inteira, estudante, vip } = formData.ingressosQtd;
    // Calcula o total de ingressos selecionados
    const totalIngressos = inteira + estudante + vip;
    // Valida se pelo menos um ingresso foi selecionado
    if (totalIngressos === 0) {
      mostrarErro('⚠️ Selecione pelo menos um ingresso.');
      return;
    }

    // Cria um array para armazenar os detalhes de cada ingresso individual
    const ingressos = [];
    // Adiciona objetos de ingresso ao array com base nas quantidades selecionadas
    for (let i = 0; i < inteira; i++) ingressos.push({ nome: '', cpf: '', tipo: 'inteira' });
    for (let i = 0; i < estudante; i++) ingressos.push({ nome: '', cpf: '', tipo: 'estudante' });
    for (let i = 0; i < vip; i++) ingressos.push({ nome: '', cpf: '', tipo: 'vip' });

    // Atualiza o estado formData com o array de ingressos preparado
    setFormData({ ...formData, ingressos });
    // Avança para a Etapa 3
    setStep(3);
  };

  /**
   * Lida com a mudança nos campos de nome e CPF para cada ingresso individual.
   * @param {object} e - O evento de mudança do input.
   * @param {number} index - O índice do ingresso no array formData.ingressos.
   * @param {string} field - O campo a ser atualizado ('nome' ou 'cpf').
   */
  const handleChange = (e, index, field) => {
    // Cria uma cópia mutável do array de ingressos para modificação
    const newIngressos = [...formData.ingressos];
    // Atualiza o valor do campo específico para o ingresso no índice dado
    newIngressos[index][field] = e.target.value;
    // Atualiza o estado formData com o array de ingressos modificado
    setFormData({ ...formData, ingressos: newIngressos });
  };

  /**
   * Lida com o avanço da Etapa 3 para a Etapa 4 (Confirmação).
   * Valida os nomes e CPFs dos visitantes.
   */
  const handleStep3Next = () => {
    // Itera sobre cada ingresso para validar os dados do visitante
    for (const ingresso of formData.ingressos) {
      // Valida se o nome do visitante foi preenchido
      if (!ingresso.nome.trim()) {
        mostrarErro('⚠️ Preencha o nome de todos os visitantes.');
        return;
      }
      // Valida o formato do CPF se ele foi preenchido (deve ter 11 dígitos numéricos)
      if (ingresso.cpf && (!/^\d{11}$/.test(ingresso.cpf))) {
        mostrarErro('⚠️ CPF deve ter 11 dígitos numéricos se preenchido.');
        return;
      }
    }
    // Se todas as validações passarem, avança para a Etapa 4
    setStep(4);
  };

  /**
   * Calcula o valor total da compra com base nas quantidades e preços dos ingressos.
   * @returns {number} - O valor total da compra.
   */
  const calcularTotal = () => {
    // Desestrutura as quantidades de ingressos
    const { inteira, estudante, vip } = formData.ingressosQtd;
    // Retorna a soma dos produtos de quantidade por preço, garantindo 0 se o preço for inválido
    return (
      (inteira || 0) * (precosIngressos.inteira || 0) +
      (estudante || 0) * (precosIngressos.estudante || 0) +
      (vip || 0) * (precosIngressos.vip || 0)
    );
  };

  /**
   * Envia os dados da compra para o backend.
   * Esta função é assíncrona e lida com o carregamento e possíveis erros.
   */
  const handleSubmit = async () => {
    // Ativa o estado de carregamento para desabilitar o botão de submissão
    setLoading(true);
    try {
      // Faz uma requisição POST para a API de compras
      const response = await fetch('http://localhost:3000/api/compras', {
        method: 'POST', // Método HTTP POST
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        // Converte os dados do formulário para JSON e envia no corpo da requisição
        body: JSON.stringify({
          dia: formData.dia,
          email: formData.email,
          ingressos: formData.ingressos,
        }),
      });

      // Verifica se a resposta da rede não foi bem-sucedida (status 2xx)
      if (!response.ok) {
        // Tenta parsear a mensagem de erro do corpo da resposta
        const errData = await response.json();
        // Lança um erro com a mensagem do backend ou uma mensagem genérica
        throw new Error(errData.message || 'Erro ao processar a compra');
      }

      // Converte a resposta de sucesso para JSON
      const data = await response.json();

      // Exibe uma mensagem de sucesso com o código da compra
      mostrarToastSucesso('Compra realizada com sucesso! Código da compra: ' + data.purchaseId);
      // Fecha o modal após a compra bem-sucedida
      onClose();

    } catch (error) {
      // Em caso de erro durante a submissão, exibe uma mensagem de erro
      mostrarErro(error.message || 'Erro ao processar a compra.');
    } finally {
      // Desativa o estado de carregamento, independentemente do sucesso ou falha
      setLoading(false);
    }
  };

  return (
    // Backdrop do modal, que cobre a tela inteira e permite fechar o modal ao clicar fora
    <div className="modal-backdrop">
      {/* Conteúdo principal do modal */}
      <div className="modal-content">
        {/* Botão para fechar o modal */}
        <button className="close-button" onClick={onClose}>×</button>

        {/* Renderiza a Etapa 1: Dados do Comprador */}
        {step === 1 && (
          <div className="step">
            <h2>🎟️ Dados do Comprador</h2>
            <label>
              Data da visita:
              <input
                type="date"
                value={formData.dia}
                // Atualiza o estado 'dia' do formData quando a data muda
                onChange={(e) => setFormData({ ...formData, dia: e.target.value })}
              />
            </label>
            <label>
              E-mail:
              <input
                type="email"
                value={formData.email}
                // Atualiza o estado 'email' do formData quando o e-mail muda
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>

            <div className="step-buttons">
              {/* Botão para cancelar e fechar o modal */}
              <button onClick={onClose} className="step-button1">Cancelar</button>
              {/* Botão para avançar para a próxima etapa */}
              <button onClick={handleStep1Next} className="step-button2">Próximo</button>
            </div>
          </div>
        )}

        {/* Renderiza a Etapa 2: Tipos de Ingressos */}
        {step === 2 && (
          <div className="step">
            <h2>🎟️ Tipos de Ingressos</h2>
            <label>
              Ingressos Inteira (R$ {precosIngressos.inteira.toFixed(2)}):
              <input
                type="number"
                min="0"
                value={formData.ingressosQtd.inteira}
                onChange={(e) => {
                  const val = e.target.value;
                  const num = Number(val);
                  // Atualiza a quantidade de ingressos inteira, garantindo que seja um número não negativo
                  setFormData({
                    ...formData,
                    ingressosQtd: {
                      ...formData.ingressosQtd,
                      inteira: Math.max(0, Number.isNaN(num) ? 0 : num),
                    },
                  });
                }}
              />
            </label>
            <label>
              Ingressos Estudante (R$ {precosIngressos.estudante.toFixed(2)}):
              <input
                type="number"
                min="0"
                value={formData.ingressosQtd.estudante}
                onChange={(e) => {
                  const val = e.target.value;
                  const num = Number(val);
                  // Atualiza a quantidade de ingressos estudante, garantindo que seja um número não negativo
                  setFormData({
                    ...formData,
                    ingressosQtd: {
                      ...formData.ingressosQtd,
                      estudante: Math.max(0, Number.isNaN(num) ? 0 : num),
                    },
                  });
                }}
              />
            </label>
            <label>
              Ingressos VIP (R$ {precosIngressos.vip.toFixed(2)}):
              <input
                type="number"
                min="0"
                value={formData.ingressosQtd.vip}
                onChange={(e) => {
                  const val = e.target.value;
                  const num = Number(val);
                  // Atualiza a quantidade de ingressos VIP, garantindo que seja um número não negativo
                  setFormData({
                    ...formData,
                    ingressosQtd: {
                      ...formData.ingressosQtd,
                      vip: Math.max(0, Number.isNaN(num) ? 0 : num),
                    },
                  });
                }}
              />
            </label>

            <div className="step-buttons">
              {/* Botão para voltar para a Etapa 1 */}
              <button onClick={() => setStep(1)}>Voltar</button>
              {/* Botão para avançar para a próxima etapa */}
              <button onClick={handleStep2Next}>Próximo</button>
            </div>
          </div>
        )}

        {/* Renderiza a Etapa 3: Dados dos Visitantes */}
        {step === 3 && (
          <div className="step">
            <h2>👤 Dados dos Visitantes</h2>
            {/* Conteúdo rolável para exibir os campos de visitantes */}
            <div className="scrollable-content">
              {/* Mapeia sobre o array de ingressos para renderizar campos para cada um */}
              {formData.ingressos.map((ingresso, index) => (
                <div key={index} className="visitor-inputs">
                  <p><strong>Ingresso {index + 1} ({ingresso.tipo})</strong></p>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={ingresso.nome}
                    // Chama handleChange para atualizar o nome do visitante
                    onChange={(e) => handleChange(e, index, 'nome')}
                  />
                  <input
                    type="text"
                    placeholder="CPF (opcional)"
                    value={ingresso.cpf}
                    // Chama handleChange para atualizar o CPF do visitante
                    onChange={(e) => handleChange(e, index, 'cpf')}
                    maxLength={11} // Limita o CPF a 11 dígitos
                  />
                </div>
              ))}
            </div>
            <div className="step-buttons">
              {/* Botão para voltar para a Etapa 2 */}
              <button onClick={() => setStep(2)}>Voltar</button>
              {/* Botão para avançar para a Etapa 4 (Revisão e Confirmação) */}
              <button onClick={handleStep3Next}>Revisar e Confirmar</button>
            </div>
          </div>
        )}

        {/* Renderiza a Etapa 4: Confirmação da Compra */}
        {step === 4 && (
          <div className="step step-confirmation" style={{ maxHeight: '600px', display: 'flex', flexDirection: 'column' }}>
            <h2>📋 Confirmação da Compra</h2>

            {/* Conteúdo rolável para a revisão da compra */}
            <div className="scrollable-content" style={{ overflowY: 'auto', flexGrow: 1, maxHeight: '278px' }}>
              {/* Card de Dados do Comprador */}
              <div className="card">
                <h3>Dados do Comprador</h3>
                <p><strong>Data da visita:</strong> {new Date(formData.dia).toLocaleDateString('pt-BR')}</p>
                <p><strong>E-mail:</strong> {formData.email}</p>
              </div>

              {/* Card de Ingressos Selecionados */}
              <div className="card">
                <h3>Ingressos Selecionados</h3>
                <table className="summary-table">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Quantidade</th>
                      <th>Preço Unitário</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapeia sobre os tipos de ingresso para exibir o resumo */}
                    {['inteira', 'estudante', 'vip'].map((tipo) => {
                      const qtd = formData.ingressosQtd[tipo];
                      if (qtd > 0) {
                        return (
                          <tr key={tipo}>
                            <td>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</td>
                            <td>{qtd}</td>
                            <td>R$ {precosIngressos[tipo].toFixed(2)}</td>
                            <td>R$ {(qtd * precosIngressos[tipo]).toFixed(2)}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="total-row">
                      <td colSpan="3"><strong>Total</strong></td>
                      <td><strong>R$ {calcularTotal().toFixed(2)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Card de Visitantes */}
              <div className="card">
                <h3>Visitantes</h3>
                <ul className="visitor-list">
                  {/* Mapeia sobre os ingressos para listar os visitantes */}
                  {formData.ingressos.map((ingresso, idx) => (
                    <li key={idx}>
                      <strong>{idx + 1}.</strong> {ingresso.nome} {ingresso.cpf && `(CPF: ${ingresso.cpf})`} — {ingresso.tipo}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="step-buttons" style={{ marginTop: '15px' }}>
              {/* Botão para voltar para a Etapa 3 */}
              <button onClick={() => setStep(3)}>Voltar</button>
              {/* Botão para confirmar a compra, desabilitado durante o carregamento */}
              <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Processando...' : 'Confirmar Compra'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporta o componente para ser usado em outras partes da aplicação
export default CompraIngressosModal;