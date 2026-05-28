async function buscarSolicitacoes() {

  const response = await fetch(API_URL);

  return await response.json();

}

async function movimentarVeiculo(dados){

  const response = await fetch(API_URL,{
    method:'POST',
    body:JSON.stringify(dados)
  });

  return await response.json();

}

