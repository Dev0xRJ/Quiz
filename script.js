let perguntas = [];
let indiceAtual = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("question");
const respostasEl = document.getElementById("answers");
const imagemEl = document.getElementById("imagemPergunta");
const scoreEl = document.getElementById("score");
const btnProxima = document.getElementById("next");
const reactionEl = document.getElementById("reaction");

fetch("perguntas_quiz.json")
  .then(res => res.json())
  .then(data => {
    perguntas = embaralharArray(data);
    carregarPergunta();
  });

function carregarPergunta() {
  const pergunta = perguntas[indiceAtual];
  perguntaEl.innerText = pergunta.pergunta;
  respostasEl.innerHTML = "";

  if (pergunta.imagem) {
    imagemEl.src = "img/" + pergunta.imagem; // Corrigido aqui
    imagemEl.style.display = "block";
  } else {
    imagemEl.style.display = "none";
  }

  pergunta.opcoes.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.innerText = opcao;
    btn.onclick = () => selecionarResposta(i);
    respostasEl.appendChild(btn);
  });

  btnProxima.onclick = () => {
    indiceAtual++;
    if (indiceAtual < perguntas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  };

  scoreEl.innerText = `Pontuação: ${pontuacao}`; // Corrigido aqui
}

function selecionarResposta(index) {
  const correta = perguntas[indiceAtual].correta;

  // Reação com imagem
  if (index === correta) {
    pontuacao++;
    reactionEl.innerHTML = `<img src="img/Cérebro Amigável com Sinal Verde.png" alt="Correto" style="height:40px;vertical-align:middle;"> <span style="color:lime;">Resposta correta!</span>`;
  } else {
    reactionEl.innerHTML = `<img src="img/Cérebro triste.png" alt="Errado" style="height:40px;vertical-align:middle;"> <span style="color:red;">Resposta errada!</span>`;
  }

  // Desabilita os botões após resposta
  Array.from(respostasEl.children).forEach(btn => btn.disabled = true);

  setTimeout(() => {
    reactionEl.innerHTML = "";
    indiceAtual++;
    if (indiceAtual < perguntas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  }, 1200);
}

function mostrarResultado() {
  perguntaEl.innerText = "Quiz finalizado!";
  respostasEl.innerHTML = "";
  imagemEl.style.display = "none";
  btnProxima.style.display = "none";

  const reiniciar = document.createElement("button");
  reiniciar.innerText = "Reiniciar";
  reiniciar.onclick = () => location.reload();
  respostasEl.appendChild(reiniciar);

  scoreEl.innerText = `Pontuação final: ${pontuacao}/${perguntas.length}`; // Corrigido aqui
}

function embaralharArray(array) {
  return array.sort(() => Math.random() - 0.5);
}