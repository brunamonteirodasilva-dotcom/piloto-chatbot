document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     ELEMENTOS DO CHAT
     ========================================================= */

  const chatButton = document.getElementById("chatButton");
  const chatWindow = document.getElementById("chatWindow");
  const closeChat = document.getElementById("closeChat");

  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendMessage = document.getElementById("sendMessage");


  /* =========================================================
     ABRIR CHAT
     ========================================================= */

  function abrirChat() {
    if (!chatWindow) return;

    chatWindow.style.display = "flex";

    if (chatInput) {
      setTimeout(function () {
        chatInput.focus();
      }, 100);
    }
  }


  /* =========================================================
     FECHAR CHAT
     ========================================================= */

  function fecharChat() {
    if (!chatWindow) return;

    chatWindow.style.display = "none";
  }


  /* =========================================================
     NORMALIZAR TEXTO
     
     Remove acentos, coloca tudo em minúsculas
     e elimina diferenças de pontuação.
     ========================================================= */

  function normalizarTexto(texto) {

    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  }


  /* =========================================================
     CALCULAR SIMILARIDADE ENTRE PERGUNTA E FRASE
     ========================================================= */

  function calcularPontuacao(pergunta, frase) {

    const perguntaNormalizada = normalizarTexto(pergunta);
    const fraseNormalizada = normalizarTexto(frase);

    if (!perguntaNormalizada || !fraseNormalizada) {
      return 0;
    }

    /* Correspondência exata */

    if (perguntaNormalizada === fraseNormalizada) {
      return 100;
    }

    /* Uma frase contém a outra */

    if (
      perguntaNormalizada.includes(fraseNormalizada) ||
      fraseNormalizada.includes(perguntaNormalizada)
    ) {
      return 80;
    }

    /* Comparação por palavras */

    const palavrasPergunta = perguntaNormalizada
      .split(" ")
      .filter(palavra => palavra.length >= 3);

    const palavrasFrase = fraseNormalizada
      .split(" ")
      .filter(palavra => palavra.length >= 3);

    if (palavrasPergunta.length === 0) {
      return 0;
    }

    let palavrasEncontradas = 0;

    palavrasPergunta.forEach(function (palavra) {

      if (palavrasFrase.includes(palavra)) {
        palavrasEncontradas++;
      }

    });

    const percentual =
      (palavrasEncontradas / palavrasPergunta.length) * 100;

    return percentual;

  }


  /* =========================================================
     PROCURAR RESPOSTA NO CONHECIMENTO
     ========================================================= */

  function procurarResposta(pergunta) {

    if (
      typeof conhecimento === "undefined" ||
      !Array.isArray(conhecimento)
    ) {

      console.error(
        "A base conhecimento.js não foi carregada."
      );

      return {
        resposta:
          "No momento, minha base de conhecimento não está disponível. Por favor, tente novamente mais tarde.",
        encontrada: false
      };

    }


    let melhorResultado = null;
    let melhorPontuacao = 0;


    /* Percorre todos os temas */

    conhecimento.forEach(function (item) {

      if (!item.perguntas || !Array.isArray(item.perguntas)) {
        return;
      }


      item.perguntas.forEach(function (perguntaCadastrada) {

        const pontuacao =
          calcularPontuacao(pergunta, perguntaCadastrada);


        if (pontuacao > melhorPontuacao) {

          melhorPontuacao = pontuacao;

          melhorResultado = item;

        }

      });

    });


    /*
       45% é o limite mínimo para considerar
       que encontramos uma pergunta relacionada.
    */

    if (melhorResultado && melhorPontuacao >= 45) {

      return {
        resposta: melhorResultado.resposta,
        encontrada: true,
        tema: melhorResultado.tema,
        pontuacao: melhorPontuacao
      };

    }


    /* =====================================================
       RESPOSTA PADRÃO
       ===================================================== */

    return {

      resposta:
        "Ainda não encontrei uma resposta cadastrada para essa pergunta. Tente utilizar outros termos ou procure a informação nas áreas de Ensino e Pesquisa.",

      encontrada: false

    };

  }


  /* =========================================================
     ADICIONAR MENSAGEM DO USUÁRIO
     ========================================================= */

  function adicionarMensagemUsuario(texto) {

    if (!chatMessages) return;


    const mensagem = document.createElement("div");

    mensagem.className = "userMessage";

    mensagem.textContent = texto;


    chatMessages.appendChild(mensagem);

    rolarChatParaBaixo();

  }


  /* =========================================================
     ADICIONAR MENSAGEM DO ASSISTENTE
     ========================================================= */

  function adicionarMensagemAssistente(texto) {

    if (!chatMessages) return;


    const mensagem = document.createElement("div");

    mensagem.className = "botMessage";

    mensagem.textContent = texto;


    chatMessages.appendChild(mensagem);

    rolarChatParaBaixo();

  }


  /* =========================================================
     ROLAR CHAT PARA BAIXO
     ========================================================= */

  function rolarChatParaBaixo() {

    if (!chatMessages) return;

    chatMessages.scrollTop =
      chatMessages.scrollHeight;

  }


  /* =========================================================
     PROCESSAR PERGUNTA
     ========================================================= */

  function processarPergunta() {

    if (!chatInput) return;


    const pergunta = chatInput.value.trim();


    /* Não enviar mensagem vazia */

    if (!pergunta) {
      return;
    }


    /* Mostra pergunta do usuário */

    adicionarMensagemUsuario(pergunta);


    /* Limpa campo */

    chatInput.value = "";


    /*
       Pequeno atraso para deixar a conversa
       mais natural.
    */

    setTimeout(function () {

      const resultado =
        procurarResposta(pergunta);


      adicionarMensagemAssistente(
        resultado.resposta
      );


    }, 300);

  }


  /* =========================================================
     EVENTO DO BOTÃO FLUTUANTE
     ========================================================= */

  if (chatButton) {

    chatButton.addEventListener(
      "click",
      abrirChat
    );

  }


  /* =========================================================
     EVENTO DO BOTÃO FECHAR
     ========================================================= */

  if (closeChat) {

    closeChat.addEventListener(
      "click",
      fecharChat
    );

  }


  /* =========================================================
     EVENTO DO BOTÃO ENVIAR
     ========================================================= */

  if (sendMessage) {

    sendMessage.addEventListener(
      "click",
      processarPergunta
    );

  }


  /* =========================================================
     ENVIAR COM ENTER
     ========================================================= */

  if (chatInput) {

    chatInput.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {

          event.preventDefault();

          processarPergunta();

        }

      }
    );

  }


});
