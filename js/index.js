async function carregarDashboard(){

  const response =
    await fetch(
      API_URL + '?action=listar'
    );

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
      item =>
        item.status ===
        'SOLICITADO'
    );

  const aguardando =
    dadosFiltrados.filter(
      item =>
        item.status ===
        'AGUARDANDO_LAVAGEM'
    );

  const hoje =
    new Date()
      .toLocaleDateString(
        'pt-BR'
      );

  const concluidos =
    dadosFiltrados.filter(item => {

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

      const data =
        new Date(
          item.dataLavagem
        )
        .toLocaleDateString(
          'pt-BR'
        );

      return data === hoje;

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

  const filaCritica =
    [...aguardando]
      .slice(0,3);

  let htmlFila = '';

  filaCritica.forEach(item => {

    htmlFila += `

      <div class="alerta-card">

        <div>

          <div class="alerta-placa">

            ${item.placa}

          </div>

          <div>

            ${item.tipoLavagem || '-'}

          </div>

        </div>

        <div class="alerta-tempo alerta-amarelo">

          ${item.tempoMovimentacao || '-'}

        </div>

      </div>

    `;

  });

  if(htmlFila === ''){

    htmlFila = `

      <div class="alerta-card">

        Nenhum veículo em fila

      </div>

    `;

  }

  document.getElementById(
    'filaCritica'
  ).innerHTML =
    htmlFila;

}
 

carregarDashboard();

setInterval(
  carregarDashboard,
  10000
);

