let primeiraCarga = true;

async function carregarSolicitacoes(){

  alert(
  'API_URL = ' +
  API_URL
);

  const lista =
    document.getElementById(
      'listaSolicitacoes'
    );

  try{

    if(primeiraCarga){

      lista.innerHTML = `
        <div class="card">
          Carregando...
        </div>
      `;

    }

    const response =
      await fetch(
        API_URL + '?action=listar'
      );

    alert(
  JSON.stringify(
    dados[0],
    null,
    2
  )
);

    const dados =
      await response.json();

    const lojaSelecionada =
  localStorage.getItem(
    'lojaSelecionada'
  );

    console.log(
  'LOJA:',
  lojaSelecionada
);

const solicitacoes =
  dados.filter(item => {

    if(
      item.status !==
      'SOLICITADO'
    ){
      return false;
    }

    
   if(
  lojaSelecionada
){

  if(
    item.agencia !==
    lojaSelecionada
  ){

    console.log(
      'DESCARTADO',
      item.placa,
      item.agencia,
      lojaSelecionada
    );

    return false;

  }

}
    
    console.log(
  'AGENCIA ITEM:',
  item.agencia
);
    return true;

  });

 

    let html = '';

    if(solicitacoes.length === 0){

      html = `

        <div class="card">

          Nenhuma solicitação encontrada

        </div>

      `;

    }else{

      solicitacoes.forEach(item => {

        html += `

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

    }

    lista.innerHTML = html;

    primeiraCarga = false;

  }catch(error){

    console.error(error);

    if(primeiraCarga){

      lista.innerHTML = `

        <div class="card">

          Erro ao carregar solicitações

        </div>

      `;

    }

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

