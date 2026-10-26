
const botaoAumentar = document.getElementById("aumentar");
const botaoDiminuir = document.getElementById("diminuir");
const botaoContraste = document.getElementById("contraste");

let tamanhoFonte = 18;

function atualizarFonte() {
  document.body.style.fontSize = `${tamanhoFonte}px`;
}

botaoAumentar.addEventListener("click", () => {
  tamanhoFonte = Math.min(tamanhoFonte + 2, 28);
  atualizarFonte();
});

botaoDiminuir.addEventListener("click", () => {
  tamanhoFonte = Math.max(tamanhoFonte - 2, 14);
  atualizarFonte();
});

botaoContraste.addEventListener("click", () => {
  const ativado = document.body.classList.toggle("alto-contraste");

  botaoContraste.setAttribute("aria-pressed", String(ativado));
  botaoContraste.textContent = ativado
    ? "Contraste normal"
    : "Alto contraste";
});

// Atividade interativa
const alternativas = document.querySelectorAll(".opcao");
const resultado = document.getElementById("resultado");

alternativas.forEach((botao) => {
  botao.setAttribute("aria-pressed", "false");

  botao.addEventListener("click", () => {
    alternativas.forEach((item) => {
      item.setAttribute("aria-pressed", "false");
    });

    botao.setAttribute("aria-pressed", "true");

    if (botao.dataset.resposta === "certa") {
      resultado.textContent =
        "Parabéns! Decomposição é dividir um problema em partes menores.";
    } else {
      resultado.textContent =
        "Ainda não! Tente novamente. Qual pilar divide um problema em partes menores?";
    }
  });
});

// Leitura em voz alta
const botaoOuvir = document.getElementById("ouvir");
const botaoParar = document.getElementById("parar");
const statusAudio = document.getElementById("status-audio");

if ("speechSynthesis" in window) {
  botaoOuvir.addEventListener("click", () => {
    window.speechSynthesis.cancel();

    const texto = [
      "Bem-vindo ao PenseTech.",
      "Pensamento Computacional é uma forma de resolver problemas.",
      "O primeiro pilar é a decomposição: dividir problemas em partes menores.",
      "O segundo é o reconhecimento de padrões: identificar semelhanças.",
      "O terceiro é a abstração: destacar as informações importantes.",
      "O quarto é o algoritmo: organizar passos para alcançar um objetivo.",
      "Acessibilidade é tornar a tecnologia utilizável por todas as pessoas."
    ].join(" ");

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.rate = 0.9;

    fala.onstart = () => {
      statusAudio.textContent = "Leitura em voz alta iniciada.";
    };

    fala.onend = () => {
      statusAudio.textContent = "Leitura finalizada.";
    };

    fala.onerror = () => {
      statusAudio.textContent =
        "Não foi possível reproduzir a leitura neste navegador.";
    };

    window.speechSynthesis.speak(fala);
  });

  botaoParar.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    statusAudio.textContent = "Leitura interrompida.";
  });
} else {
  botaoOuvir.disabled = true;
  botaoParar.disabled = true;
  statusAudio.textContent =
    "A leitura em voz alta não está disponível neste navegador.";
}
