document.addEventListener("DOMContentLoaded", function () {

  const chatButton = document.getElementById("chatButton");
  const chatWindow = document.getElementById("chatWindow");
  const closeChat = document.getElementById("closeChat");

  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendMessage = document.getElementById("sendMessage");


  /* ===============================
     ABRIR CHAT
  =============================== */

  function abrirChat() {
    chatWindow.style.display = "flex";
    chatInput.focus();
  }


  /* ===============================
     FECHAR CHAT
  =============================== */

  function fecharChat() {
    chatWindow.style.display = "none";
  }


  chatButton.addEventListener("click", abrirChat);

  chatButton.addEventListener("keydown", function (event) {

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      abrirChat();
    }

  });


  closeChat.addEventListener("click", fecharChat);


  /* ===============================
     BASE DE PERGUNTAS E RESPOSTAS
  =============================== */

  const respostas = [

    {
      perguntas: [
        "o que é a gep",
        "o que é gep",
        "gerência de ensino e pesquisa",
        "ensino e pesquisa"
      ],

      resposta:
        "A Gerência de Ensino e Pesquisa (GEP) é responsável pela gestão das atividades relacionadas ao ensino, à pesquisa e à inovação tecnológica em saúde no HUGV."
    },


    {
      perguntas: [
        "como fazer pesquisa",
        "como iniciar uma pesquisa",
        "quero fazer uma pesquisa",
        "pesquisa no hugv"
      ],

      resposta:
        "Para iniciar uma pesquisa no HUGV, é necessário verificar o fluxo institucional aplicável ao projeto e observar os requisitos éticos e administrativos pertinentes. Consulte a seção de Gestão da Pesquisa e Inovação Tecnológica em Saúde para conhecer os fluxos."
    },


    {
      perguntas: [
        "residência médica",
        "como funciona a residência médica",
        "residência"
      ],

      resposta:
        "As informações sobre Residência Médica estão disponíveis na área específica de Ensino e Pesquisa. Acesse o cartão 'Residência Médica' para consultar as informações disponíveis."
    },


    {
      perguntas: [
        "residência multiprofissional",
        "residência multidisciplinar",
        "residência multiprofissional no hugv"
      ],

      resposta:
        "As informações sobre a Residência Multiprofissional estão disponíveis na área específica de Ensino e Pesquisa. Acesse o cartão 'Residência Multidisciplinar'."
    },


    {
      perguntas: [
        "graduação",
        "estágio de graduação",
        "graduação no hugv"
      ],

      resposta:
        "As informações relacionadas à Graduação estão disponíveis na seção de Ensino e Pesquisa. Acesse o cartão 'Graduação' para consultar as informações."
    },


    {
      perguntas: [
        "fluxos",
        "fluxo de pesquisa",
        "fluxos descritivos"
      ],

      resposta:
        "Os Fluxos Descritivos apresentam os procedimentos e caminhos institucionais relacionados às atividades de Ensino e Pesquisa. Acesse o cartão 'Fluxos Descritivos'."
    },


    {
      perguntas: [
        "relatório de gestão",
        "relatório de ensino e pesquisa"
      ],

      resposta:
        "O Relatório de Gestão de Ensino e Pesquisa reúne informações relacionadas às atividades e resultados da área. Você pode acessá-lo pelo cartão 'Relatório de Gestão de Ensino e Pesquisa'."
    }

  ];


  /* ===============================
     NORMALIZAR TEXTO
  =============================== */

  function normalizar(texto) {

    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  }


  /* ===============================
     PROCURAR RESPOSTA
  =============================== */

  function encontrarResposta(pergunta) {

    const texto = normalizar(pergunta);

    for (const item of respostas) {

      for (const perguntaCadastrada of item.perguntas) {

        const termo = normalizar(perguntaCadastrada);

        if (
          texto === termo ||
          texto.includes(termo) ||
          termo.includes(texto)
        ) {

          return item.resposta;

        }

      }

    }


    return (
      "Ainda não encontrei uma resposta cadastrada para essa pergunta. " +
      "Tente utilizar outros termos ou procure a informação nas áreas de Ensino e Pesquisa."
    );

  }


  /* ===============================
     ADICIONAR MENSAGEM NA TELA
  =============================== */

  function adicionarMensagem(texto, tipo) {

    const mensagem = document.createElement("div");

    mensagem.className =
      tipo === "usuario"
        ? "userMessage"
        : "botMessage";

    mensagem.textContent = texto;

    chatMessages.appendChild(mensagem);

    chatMessages.scrollTop = chatMessages.scrollHeight;

  }


  /* ===============================
     ENVIAR PERGUNTA
  =============================== */

  function enviarPergunta() {

    const pergunta = chatInput.value.trim();

    if (!pergunta) {
      return;
    }


    adicionarMensagem(pergunta, "usuario");

    chatInput.value = "";

    const resposta = encontrarResposta(pergunta);


    setTimeout(function () {

      adicionarMensagem(resposta, "bot");

    }, 300);

  }


  sendMessage.addEventListener("click", enviarPergunta);


  chatInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
      enviarPergunta();
    }

  });

});
