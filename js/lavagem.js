const params =
new URLSearchParams(
window.location.search
);

const id =
params.get('id');

let veiculo = null;

async function carregarLavagem(){

const response =
  await fetch(url);

const resultado =
  await response.json();

console.log(
  'RESULTADO:',
  resultado
);

alert(
  JSON.stringify(resultado)
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

const url =


API_URL +

'?action=concluir' +

'&id=' +
encodeURIComponent(id) +

'&lavador=' +
encodeURIComponent(lavador);


const response =
await fetch(url);

const resultado =
await response.json();

console.log(
resultado
);

alert(
'Lavagem concluída'
);

window.location.href =
'aguardando.html';

}


carregarLavagem();
