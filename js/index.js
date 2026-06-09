async function carregarDashboard(){

  const response =
    await fetch(API_URL + '?action=listar');

  const dados =
    await response.json();

  const lojaSelecionada =
  localStorage.getItem(
    'lojaSelecionada'
  );

const dadosFiltrados =
  dados.filter(item => {

    if(!lojaSelecionada){
      return true;
    }

    return (
      item.agencia &&
      item.agencia === lojaSelecionada
    );

  });

  const solicitados =
  dadosFiltrados.filter(
    item => item.status === 'SOLICITADO'
  );

  const aguardando =
    dadosFiltrados.filter(
      item =>
        item.status === 'AGUARDANDO_LAVAGEM'
    );

  const hoje = new Date();

  const hojeStr =
    hoje.toLocaleDateString('pt-BR');

  const concluidos =
    dadosFiltrados.filter(item => {

      if(item.status !== 'CONCLUIDO')
        return false;

      if(!item.dataLavagem)
        return false;

      const data =
        new Date(item.dataLavagem)
          .toLocaleDateString('pt-BR');

      return data === hojeStr;

    });

  document.getElementById(
    'totalSolicitacoes'
  ).innerText =
    solicitados.length;

  document.getElementById(
    'totalAguardando'
  ).innerText =
    aguardando.length;

  document.getElementById(
    'totalConcluidos'
  ).innerText =
    concluidos.length;

}

carregarDashboard();

setInterval(
  carregarDashboard,
  10000
);

