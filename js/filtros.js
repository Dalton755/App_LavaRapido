document
.getElementById(
  'tipoFiltro'
)
.addEventListener(
  'change',
  carregarFiltro
);

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

window.dadosFiltro.filter(
item =>
item.agencia === loja &&
item.status ===
'AGUARDANDO_LAVAGEM'
);

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

html += `

<div class="card">

<h3>${tipo}</h3>

`;

dados
.filter(
item =>
item.tipoLavagem === tipo
)
.forEach(item => {

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

window.dadosFiltro.filter(
item =>
item.tipoLavagem === tipo &&
item.status ===
'AGUARDANDO_LAVAGEM'
);

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

html += `

<div class="card">

<h3>${loja}</h3>

`;

dados
.filter(
item =>
item.agencia === loja
)
.forEach(item => {

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

  function filtrarPorPeriodo(dados){

  const dataInicio =
    document.getElementById(
      'dataInicio'
    ).value;

  const dataFim =
    document.getElementById(
      'dataFim'
    ).value;

  if(
    !dataInicio &&
    !dataFim
  ){
    return dados;
  }

  return dados.filter(item => {

    if(!item.dataEmail){
      return false;
    }

    const dataItem =
      new Date(item.dataEmail);

    if(
      dataInicio &&
      dataItem < new Date(dataInicio)
    ){
      return false;
    }

    if(dataFim){

      const fim =
        new Date(dataFim);

      fim.setHours(
        23,59,59,999
      );

      if(
        dataItem > fim
      ){
        return false;
      }

    }

    return true;

  });

}
