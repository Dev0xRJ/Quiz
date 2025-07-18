
let perguntas = [];
let indiceAtual = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("question");
const respostasEl = document.getElementById("answers");
const imagemEl = document.getElementById("imagemPergunta");
const scoreEl = document.getElementById("score");
const btnProxima = document.getElementById("next");

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
    imagemEl.src = "imagens/" + pergunta.imagem;
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

  scoreEl.innerText = `Pontuação: ${pontuacao}`;
}

function selecionarResposta(index) {
  const correta = perguntas[indiceAtual].correta;
  if (index === correta) pontuacao++;

  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    carregarPergunta();
  } else {
    mostrarResultado();
  }
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

  scoreEl.innerText = `Pontuação final: ${pontuacao}/${perguntas.length}`;
}

function embaralharArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


