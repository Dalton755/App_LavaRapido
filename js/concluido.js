const INTERVALO_ATUALIZACAO = 10000;

async function carregarConcluidos() {

const lista =
document.getElementById(
'listaConcluidos'
);

try {


const response =
  await fetch(
    API_URL +
    '?action=listar'
  );

const dados =
  await response.json();

const hoje =
  new Date()
  .toLocaleDateString(
    'pt-BR'
  );

  const lojaSelecionada =
  localStorage.getItem(
    'lojaSelecionada'
  );

const concluidos =
  dados.filter(item => {

    if(
      item.status !==
      'CONCLUIDO'
    ){
      return false;
    }

    if(
      !item.dataLavagem
    ){
      return false;
    }
    if(
  lojaSelecionada &&
  item.agencia !==
  lojaSelecionada
){
  return false;
}

    const dataItem =
      new Date(
        item.dataLavagem
      ).toLocaleDateString(
        'pt-BR'
      );

    return dataItem === hoje;

  });

if(
  concluidos.length === 0
){

  lista.innerHTML = `
    <div class="card">

      <h3>
        Nenhuma lavagem concluída hoje
      </h3>

    </div>
  `;

  return;

}

let html = '';

concluidos.forEach(item => {

  html += `

    <div class="card">

      <div class="card-placa">

        ${item.placa}

      </div>

      <div>

        <strong>Lavador:</strong>
        ${item.lavador || '-'}

      </div>

      <div>

        <strong>Tipo:</strong>
        ${item.tipoLavagem || '-'}

      </div>

      <div>

        <strong>Concluído:</strong>
        ${new Date(
          item.dataLavagem
        ).toLocaleString(
          'pt-BR'
        )}

      </div>

      <div>

        <strong>Tempo Total:</strong>
        ${item.tempoLavagem || '-'}

      </div>

      <div>

        <strong>Checklist:</strong>
        ${item.checklist || '-'}

      </div>

    </div>

  `;

});

lista.innerHTML = html;


} catch(error) {


console.error(error);


}

}

carregarConcluidos();

setInterval(
carregarConcluidos,
INTERVALO_ATUALIZACAO
);
