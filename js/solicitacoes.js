async function carregarSolicitacoes(){

  const lista = document.getElementById('listaSolicitacoes');

  lista.innerHTML = 'Carregando...';

  const dados = await buscarSolicitacoes();

  const solicitacoes = dados.filter(item => item.status === 'SOLICITADO');

  lista.innerHTML = '';

  solicitacoes.forEach(item => {

    const card = document.createElement('div');

    card.className = 'card';

    card.innerHTML = `
      <h3>${item.placa}</h3>
      <p>Responsável: ${item.responsavel}</p>
      <p>Aguardando há ${item.tempo}</p>

      <button class="btn" onclick="abrirMovimentacao('${item.id}')">
        Movimentar
      </button>
    `;

    lista.appendChild(card);

  });

}

function abrirMovimentacao(id){

  window.location.href = `movimentar.html?id=${id}`;

}

carregarSolicitacoes();

setInterval(carregarSolicitacoes,10000);

