document
.getElementById(
  'tipoFiltro'
)
.addEventListener(
  'change',
  carregarFiltro
);

function filtrarPorPeriodo(dados){

  const periodo =
    document.getElementById(
      'periodo'
    ).value.trim();

  if(
    !periodo ||
    !periodo.includes('→')
  ){
    return dados;
  }

  const partes =
    periodo.split(' → ');

  const inicioTexto =
    partes[0].trim();

  const fimTexto =
    partes[1].trim();

  const [diaI,mesI,anoI] =
    inicioTexto.split('/');

  const [diaF,mesF,anoF] =
    fimTexto.split('/');

  const dataInicio =
    new Date(
      anoI,
      mesI - 1,
      diaI
    );

  const dataFim =
    new Date(
      anoF,
      mesF - 1,
      diaF,
      23,59,59
    );

  return dados.filter(item => {

    if(!item.dataEmail){
      return false;
    }

    const dataItem =
      new Date(item.dataEmail);

    return (
      dataItem >= dataInicio &&
      dataItem <= dataFim
    );

  });

}


async function carregarFiltro(){

const tipo =

document.getElementById(
  'tipoFiltro'
).value;

const response =

await fetch(
  API_URL +
  '?action=listar'
);

const dados =
await response.json();

const filtroSecundario =

document.getElementById(
  'filtroSecundario'
);

if(tipo === 'LOJA'){

const lojas =

[
...new Set(
dados.map(
item => item.agencia
)
)
];

filtroSecundario.innerHTML = `

<div class="card">

<select
id="valorFiltro">

${lojas.map(loja => `

<option value="${loja}">
${loja}
</option>

`).join('')}

</select>

<button
class="btn"
onclick="filtrarLoja()">

Filtrar

</button>

</div>

`;

window.dadosFiltro =
dados;

}

if(tipo === 'TIPO'){

const tipos =

[
...new Set(
dados.map(
item => item.tipoLavagem
)
)
];

filtroSecundario.innerHTML = `

<div class="card">

<select
id="valorFiltro">

${tipos.map(tipo => `

<option value="${tipo}">
${tipo}
</option>

`).join('')}

</select>

<button
class="btn"
onclick="filtrarTipo()">

Filtrar

</button>

</div>

`;

window.dadosFiltro =
dados;

}

}

function filtrarLoja(){

const loja =

document.getElementById(
'valorFiltro'
).value;

const dados =

filtrarPorPeriodo(
  window.dadosFiltro
).filter(
item =>
item.agencia === loja &&

);

  dados.sort((a,b) => {

  const ordem = {

    SOLICITADO: 1,

    AGUARDANDO_LAVAGEM: 2,

    CONCLUIDO: 3

  };

  const statusA =
    ordem[a.status] || 99;

  const statusB =
    ordem[b.status] || 99;

  if(statusA !== statusB){

    return statusA - statusB;

  }

  return a.placa.localeCompare(
    b.placa
  );

});

const tipos =

[
'Simples',
'Especial P',
'Especial M',
'Especial G'
];

let html =

'<div class="grid-filtros">';

tipos.forEach(tipo => {

const veiculos =

dados.filter(
item =>
item.tipoLavagem === tipo
);

html += `

<div class="card">

<h3>
${tipo}
(${veiculos.length})
</h3>
`;

veiculos.forEach(item => {

html += `

<div>
${item.placa}
</div>

`;

});

html += '</div>';

});

html += '</div>';

document.getElementById(
'resultadoFiltro'
).innerHTML = html;

}

function filtrarTipo(){

const tipo =

document.getElementById(
'valorFiltro'
).value;

const dados =

filtrarPorPeriodo(
  window.dadosFiltro
).filter(
item =>
item.tipoLavagem === tipo &&

);

dados.sort((a,b) => {

  const ordem = {

    SOLICITADO: 1,

    AGUARDANDO_LAVAGEM: 2,

    CONCLUIDO: 3

  };

  const statusA =
    ordem[a.status] || 99;

  const statusB =
    ordem[b.status] || 99;

  if(statusA !== statusB){

    return statusA - statusB;

  }

  return a.placa.localeCompare(
    b.placa
  );

});

const lojas =

[
...new Set(
dados.map(
item => item.agencia
)
)
];

let html =

'<div class="grid-filtros">';

lojas.forEach(loja => {

const veiculos =

dados.filter(
item =>
item.agencia === loja
);

html += `

<div class="card">

<h3>
${loja}
(${veiculos.length})
</h3>
`;

veiculos.forEach(item => {

html += `

<div
  style="
    display:flex;
    justify-content:space-between;
    padding:4px 0;
  ">

  <span>
    ${item.placa}
  </span>

  <span>
    ${getStatusHtml(
      item.status
    )}
  </span>

</div>

`;

});

html += '</div>';

});

html += '</div>';

document.getElementById(
'resultadoFiltro'
).innerHTML = html;

}

 flatpickr(
  '#periodo',
  {

    locale: 'pt',

    mode: 'range',

    dateFormat: 'd/m/Y',

    conjunction: ' → ',

    defaultDate: [
      new Date(
        new Date()
          .getFullYear(),
        new Date()
          .getMonth(),
        1
      ),
      new Date()
    ]

  }
);

function getStatusHtml(status){

  if(status === 'SOLICITADO'){

    return `
      <span
        style="
          color:#2563eb;
          font-weight:700;
        ">
        SOLICITADO
      </span>
    `;

  }

  if(
    status ===
    'AGUARDANDO_LAVAGEM'
  ){

    return `
      <span
        style="
          color:#f59e0b;
          font-weight:700;
        ">
        AGUARDANDO
      </span>
    `;

  }

  if(status === 'CONCLUIDO'){

    return `
      <span
        style="
          color:#16a34a;
          font-weight:700;
        ">
        CONCLUÍDO
      </span>
    `;

  }

  return status;

}
