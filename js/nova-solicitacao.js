async function salvarSolicitacao(){

  const loja =
    document.getElementById('loja').value;

  const placa =
    document.getElementById('placa')
      .value
      .trim()
      .toUpperCase();

  const tipoLavagem =
    document.getElementById('tipo').value;

  const responsavel =
    document.getElementById('responsavel')
      .value
      .trim();

  const observacao =
    document.getElementById('observacao')
      .value
      .trim();

  if(placa.length !== 7){

    alert('Informe uma placa válida.');

    return;

  }

  try{

    const url =
      API_URL +
      '?action=novaSolicitacao' +
      '&loja=' + encodeURIComponent(loja) +
      '&placa=' + encodeURIComponent(placa) +
      '&tipoLavagem=' + encodeURIComponent(tipoLavagem) +
      '&responsavel=' + encodeURIComponent(responsavel) +
      '&observacao=' + encodeURIComponent(observacao);

    const response =
      await fetch(url);

    const resultado =
      await response.json();

    if(!resultado.sucesso){

      alert('Erro ao cadastrar.');

      return;

    }

    alert('Solicitação cadastrada com sucesso!');

    window.location.href =
      'solicitacoes.html';

  }catch(e){

    console.error(e);

    alert('Erro de comunicação com o servidor.');

  }

}
