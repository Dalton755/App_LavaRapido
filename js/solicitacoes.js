const response =
  await fetch(API_URL + '?action=listar');

const dados =
  await response.json();

console.log(dados);
