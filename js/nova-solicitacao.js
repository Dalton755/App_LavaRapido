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
