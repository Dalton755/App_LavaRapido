async function salvarSolicitacao(){

  const loja =
    document.getElementById(
      'loja'
    ).value;

  const placa =
    document.getElementById(
      'placa'
    )
    .value
    .trim()
    .toUpperCase();

  const tipoLavagem =
    document.getElementById(
      'tipo'
    ).value;

  const responsavel =
    document.getElementById(
      'responsavel'
    )
    .value
    .trim();

  const observacao =
    document.getElementById(
      'observacao'
    )
    .value
    .trim();

  if(placa.length !== 7){

    alert(
      'Informe uma placa válida.'
    );

    return;

  }

  try{

    const response =
      await fetch(
        API_URL,
        {

          method:'POST',

          headers:{
            'Content-Type':
            'application/json'
          },

          body:JSON.stringify({

            action:
              'novaSolicitacao',

            loja,

            placa,

            tipoLavagem,

            responsavel,

            observacao

          })

        }
      );

    const resultado =
      await response.json();

    if(!resultado.sucesso){

      alert(
        'Erro ao cadastrar.'
      );

      return;

    }

    alert(
      'Solicitação cadastrada com sucesso!'
    );

    window.location.href =
      'solicitacoes.html';

  }catch(e){

    console.error(e);

    alert(
      'Erro de comunicação com o servidor.'
    );

  }

}
