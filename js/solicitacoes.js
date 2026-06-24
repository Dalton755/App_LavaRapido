let primeiraCarga = true;

async function carregarSolicitacoes(){

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

console.log(
  'STATUS:',
  response.status
);

console.log(
  'URL:',
  API_URL
);

const dados =
  await response.json();

const lojaSelecionada =
  localStorage.getItem(
    'lojaSelecionada'
  );

  console.log(
  'FILTRO:',
  '[' + lojaSelecionada + ']'
);

  const filtroPlaca =

  document
    .getElementById(
      'filtroPlaca'
    )
    ?.value
    ?.trim()
    ?.toUpperCase() || '';

const solicitacoes =
  dados.filter(item => {

    if(
      item.status !==
      'SOLICITADO'
    ){
      return false;
    }

    const agencia =
  String(item.agencia)
    .trim()
    .toUpperCase();

const loja =
  String(lojaSelecionada)
    .trim()
    .toUpperCase();

if(
  loja &&
  agencia !== loja
){
  return false;
}

    if(
  filtroPlaca &&
  !item.placa
    .toUpperCase()
    .includes(filtroPlaca)
){
  return false;
}

return true;

  });

  console.log(
  'TOTAL API:',
  dados.length
);

console.log(
  'TOTAL SOLICITACOES:',
  solicitacoes.length
);

console.log(
  solicitacoes
);

let html = '';

if(solicitacoes.length === 0){

  html = `
    <div class="card">
      Nenhuma solicitação encontrada
    </div>
  `;

}else{

  solicitacoes.forEach(item => {

    console.log(
  item.placa,
  item.tipoLavagem
);

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
            👤 ${item.responsavel}
          </div>

          <div>
            🏢 ${item.agencia}
          </div>
          
        </div>

            <div class="card-tag">
    
              🚿 ${item.tipoLavagem || '-'}
    
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

  alert(
    error.message
  );


console.error(
  'Erro ao carregar solicitações:',
  error
);

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
