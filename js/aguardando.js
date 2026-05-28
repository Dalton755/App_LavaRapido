async function carregarAguardando(){

  const lista =
    document.getElementById(
      'listaAguardando'
    );

  try{

    const response =
      await fetch(
        API_URL +
        '?action=listar'
      );

    const dados =
      await response.json();

    const aguardando =
      dados.filter(
        item =>
          item.status ===
          'AGUARDANDO_LAVAGEM'
      );

    let html = '';

    aguardando.forEach(item => {

      html += `

        <div class="card">

          <img
            src="${
              item.foto ||
              'https://placehold.co/600x400?text=Sem+Foto'
            }"
            class="foto-card">

          <div class="card-placa">

            ${item.placa}

          </div>

          <div>

              Responsável:
              ${item.responsavel || '-'}
            
            </div>
            
            <div>
            
              Movimentador:
              ${item.movimentador || '-'}
            
            </div>
            
            <div>
            
              Tipo:
              ${item.tipoLavagem || '-'}

          </div>

          <div>

            Movimentador:
            ${item.movimentador || '-'}
          
          </div>
          
          <div>
          
            Tipo:
            ${item.tipoLavagem || '-'}
          
          </div>

          <div>

            ${item.movimentador || ''}

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

  }catch(error){

    console.error(error);

  }

}

function abrirLavagem(id){

  window.location.href =
    'lavagem.html?id=' + id;

}

carregarAguardando();

setInterval(
  carregarAguardando,
  10000
);
