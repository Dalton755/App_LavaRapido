const params =
  new URLSearchParams(
    window.location.search
  );

const id =
  params.get('id');

let solicitacao = null;

async function carregarDados(){

  const response =
    await fetch(
      API_URL + '?action=listar'
    );

  const dados =
    await response.json();

  solicitacao =
    dados.find(item => item.id == id);

  if(!solicitacao){

    alert('Solicitação não encontrada');

    return;

  }

  document.getElementById(
    'placa'
  ).innerText =
    solicitacao.placa;

  document.getElementById(
    'responsavel'
  ).innerText =
    solicitacao.responsavel;

  document.getElementById(
    'agencia'
  ).innerText =
    solicitacao.agencia;

}

async function movimentar(){

  const movimentador =
    document.getElementById(
      'movimentador'
    ).value;

  const tipoLavagem =
    document.getElementById(
      'tipoLavagem'
    ).value;

  if(!movimentador){

    alert(
      'Informe o movimentador'
    );

    return;

  }

  if(!tipoLavagem){

    alert(
      'Selecione o tipo'
    );

    return;

  }

  const body = {

    action:'movimentar',

    id:id,

    movimentador,

    tipoLavagem,

const arquivo =
  document.getElementById(
    'foto'
  ).files[0];

let fotoBase64 = '';

if(arquivo){

  fotoBase64 =
    await converterBase64(
      arquivo
    );

}


  };

  await fetch(API_URL,{

    method:'POST',

    body:JSON.stringify(body)

  });

  alert(
    'Movimentação registrada'
  );

  window.location.href =
    'solicitacoes.html';

}

carregarDados();

