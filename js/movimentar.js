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
    dados.find(
      item => item.id == id
    );

  if(!solicitacao){

    alert(
      'Solicitação não encontrada'
    );

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

 

  if(!movimentador){

    alert(
      'Informe o movimentador'
    );

    return;

  }



  const body = {

    action:'movimentar',

    id:id,

    placa:
      solicitacao.placa,

    movimentador,



  };

const url =

  API_URL +

  '?action=movimentar' +

  '&id=' + encodeURIComponent(id) +

  '&movimentador=' + encodeURIComponent(movimentador) +

  '&tipoLavagem=' + encodeURIComponent(tipoLavagem);

await fetch(url);



  alert(
    'Movimentação registrada'
  );

  window.location.href =
    'solicitacoes.html';

}

function converterBase64(file){

  return new Promise(
    (resolve,reject)=>{

      const reader =
        new FileReader();

      reader.readAsDataURL(file);

      reader.onload =
        () => resolve(
          reader.result
        );

      reader.onerror =
        error => reject(error);

    }
  );

}

carregarDados();

document
  .getElementById('foto')
  .addEventListener(
    'change',
    previewImagem
  );

function previewImagem(event){

  const arquivo =
    event.target.files[0];

  if(!arquivo) return;

  const preview =
    document.getElementById(
      'previewImagem'
    );

  preview.src =
    URL.createObjectURL(
      arquivo
    );

  preview.style.display =
    'block';

}



