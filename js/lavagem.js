const params =
new URLSearchParams(
window.location.search
);

const id =
params.get('id');

let veiculo = null;

async function carregarLavagem(){

const response =
await fetch(
API_URL +
'?action=listar'
);

const dados =
await response.json();

veiculo =
dados.find(
item => item.id == id
);

if(!veiculo){


alert(
  'Veículo não encontrado'
);

return;


}

document.getElementById(
'placa'
).innerText =
veiculo.placa;

document.getElementById(
'responsavel'
).innerText =
veiculo.responsavel;

}

async function concluirLavagem(){

  alert('Lavagem Concluída');
  
const lavador =
document.getElementById(
'lavador'
).value;

if(!lavador){


alert(
  'Informe o lavador'
);

return;


}

const checklist =
[...document.querySelectorAll(
'input[type="checkbox"]:checked'
)]
.map(
item => item.value
)
.join(', ');

const url =


API_URL +

'?action=concluir' +

'&id=' +
encodeURIComponent(id) +

'&lavador=' +
encodeURIComponent(lavador) +

'&checklist=' +
encodeURIComponent(checklist);


await fetch(url);

alert(
'Lavagem concluída'
);

window.location.href =
'aguardando.html';

}

carregarLavagem();
