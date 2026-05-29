const INTERVALO_ATUALIZACAO = 10000;

async function carregarAguardando() {

const lista = document.getElementById(
'listaAguardando'
);

try {

```
const response = await fetch(
  API_URL + '?action=listar'
);

const dados = await response.json();

const aguardando = dados.filter(
  item =>
    item.status ===
    'AGUARDANDO_LAVAGEM'
);

console.log(
  'AGUARDANDO:',
  aguardando
);

if (aguardando.length === 0) {

  lista.innerHTML = `
    <div class="card">
      <h3>Nenhum veículo aguardando lavagem</h3>
    </div>
  `;

  return;

}

let html = '';

aguardando.forEach(item => {

  html += `
    <div class="card">

      <img
        src="${item.foto && item.foto !== '' ? item.foto : 'https://placehold.co/600x400/png?text=' + encodeURIComponent(item.placa)}"
        class="foto-card"
        alt="${item.placa}">

      <div class="card-placa">
        ${item.placa}
      </div>

      <div class="card-info">

        <div>
          <strong>Responsável:</strong>
          ${item.responsavel || '-'}
        </div>

        <div>
          <strong>Movimentador:</strong>
          ${item.movimentador || '-'}
        </div>

        <div>
          <strong>Tipo:</strong>
          ${item.tipoLavagem || '-'}
        </div>

      </div>

      <div class="card-tempo">
        ⏱ Aguardando há
        ${item.tempoMovimentacao || '0 min'}
      </div>

      <div class="card-footer">

        <button
          class="btn btn-yellow"
          onclick="abrirLavagem('${item.id}')">

          Iniciar Lavagem

        </button>

      </div>

    </div>
  `;

});

lista.innerHTML = html;
```

} catch (error) {

```
console.error(
  'Erro ao carregar veículos:',
  error
);

lista.innerHTML = `
  <div class="card">
    Erro ao carregar veículos
  </div>
`;
```

}

}

function abrirLavagem(id) {

window.location.href =
'lavagem.html?id=' + id;

}

carregarAguardando();

setInterval(
carregarAguardando,
INTERVALO_ATUALIZACAO
);
