async function carregarSolicitacoes(){

  const lista =
    document.getElementById(
      'listaSolicitacoes'
    );

  lista.innerHTML = 'Carregando...';

  try{

    const response =
      await fetch(
        API_URL + '?action=listar'
      );

    const dados =
      await response.json();

    console.log(dados);

    const solicitacoes =
      dados.filter(
        item =>
          item.status === 'SOLICITADO'
      );

    lista.innerHTML = '';

    if(solicitacoes.length === 0){

      lista.innerHTML = `
        <div class="card">

          Nenhuma solicitação encontrada

        </div>
      `;

      return;

    }

    solicitacoes.forEach(item => {

      lista.innerHTML += `

        <div class="card">

          <div class="card-top">

            <div class="placa">
              ${item.placa}
            </div>

            <div class="tempo">
              ${item.tempo}
            </div>

          </div>

          <div class="card-info">

            <div>
              ${item.responsavel}
            </div>

            <div>
              ${item.agencia}
            </div>

          </div>

          <div class="card-footer">

            <button
              class="btn"
              onclick="abrirMovimentacao('${item.id}')">

              Movimentar

            </button>

          </div>

        </div>

      `;

    });

  }catch(error){

    console.error(error);

    lista.innerHTML = `

      <div class="card">

        Erro ao carregar solicitações

      </div>

    `;

  }

}

function abrirMovimentacao(id){

  window.location.href =
    'movimentar.html?id=' + id;

}

carregarSolicitacoes();

setInterval(
  carregarSolicitacoes,
  10000
);

