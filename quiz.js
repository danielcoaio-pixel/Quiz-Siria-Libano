const bancoDePerguntas = [
    { pergunta: "Qual é a capital da Síria?", opcoes: ["Beirute", "Amã", "Damasco", "Bagdá"], respostaCerta: "Damasco" },
    { pergunta: "Qual importante rio cruza o território sírio?", opcoes: ["Nilo", "Eufrates", "Tigre", "Jordão"], respostaCerta: "Eufrates" },
    { pergunta: "A Síria possui costa para qual mar?", opcoes: ["Mar Mediterrâneo", "Mar Vermelho", "Mar Negro", "Mar Cáspio"], respostaCerta: "Mar Mediterrâneo" },
    { pergunta: "Qual é o idioma oficial da Síria?", opcoes: ["Curdo", "Árabe", "Turco", "Persa"], respostaCerta: "Árabe" },
    { pergunta: "Qual mar banha a costa do Líbano?", opcoes: ["Mar Negro", "Mar Morto", "Mar Mediterrâneo", "Mar Vermelho"], respostaCerta: "Mar Mediterrâneo" },
    { pergunta: "Qual destes pratos é um clássico muito famoso da culinária libanesa?", opcoes: ["Tacos", "Croissant", "Quibe (Kibe)", "Sushi"], respostaCerta: "Quibe (Kibe)" },
    { pergunta: "Qual é o nome da moeda oficial usada no Líbano?", opcoes: ["Dólar libanês", "Libra libanesa", "Euro", "Peso libanês"], respostaCerta: "Libra libanesa" },
    { pergunta: "Quais são as cores das faixas da bandeira do Líbano (acima e abaixo do cedro)?", opcoes: ["Vermelho e branco", "Azul e branco", "Preto e vermelho", "Verde e amarelo"], respostaCerta: "Vermelho e branco" },
    { pergunta: "O Líbano faz fronteira terrestre com apenas dois países: a Síria e Israel.", opcoes: ["Verdadeiro", "Falso"], respostaCerta: "Verdadeiro" },
    { pergunta: "A moeda oficial utilizada na Síria é a Libra Síria.", opcoes: ["Falso", "Verdadeiro"], respostaCerta: "Verdadeiro" },
    
   
    { pergunta: "Qual é a capital do Líbano?", opcoes: ["Damasco", "Alepo", "Beirute", "Trípoli"], respostaCerta: "Beirute" },
    { pergunta: "Qual é o símbolo nacional que aparece no centro da bandeira do Líbano?", opcoes: ["Uma águia", "Uma estrela", "Um cedro", "Um leão"], respostaCerta: "Um cedro" },
    { pergunta: "Qual cidade síria é famosa por suas ruínas antigas e frequentemente chamada de 'Noiva do Deserto'?", opcoes: ["Palmira", "Damasco", "Alepo", "Homs"], respostaCerta: "Palmira" },
    { pergunta: "Qual destas saladas famosas é originária do Líbano/Síria, feita com salsa, hortelã e trigo?", opcoes: ["Tabule", "Salada Caesar", "Caprese", "Salada Grega"], respostaCerta: "Tabule" },
    { pergunta: "Qual império dominou a Síria e o Líbano por cerca de 400 anos até a 1ª Guerra Mundial?", opcoes: ["Império Romano", "Império Otomano", "Império Persa", "Império Britânico"], respostaCerta: "Império Otomano" },
    { pergunta: "A Síria abriga uma das cidades continuamente habitadas mais antigas do mundo. Qual é?", opcoes: ["Damasco", "Dubai", "Cairo", "Riad"], respostaCerta: "Damasco" },
    { pergunta: "Qual é o nome da famosa cadeia de montanhas que dá nome ao país Líbano?", opcoes: ["Cordilheira dos Andes", "Alpes", "Montanhas Rochosas", "Monte Líbano"], respostaCerta: "Monte Líbano" },
    { pergunta: "Quais cores compõem a bandeira atual da Síria (que também inclui três estrelas vermelhas)?", opcoes: ["Vermelho, branco e preto", "Verde, branco e preto", "Azul, amarelo e verde", "Preto, branco e amarelo"], respostaCerta: "Verde, branco e preto" },
    { pergunta: "Qual cidade libanesa é famosa por suas imponentes ruínas romanas (Templo de Baco)?", opcoes: ["Baalbek", "Tiro", "Biblos", "Sídon"], respostaCerta: "Baalbek" },
    { pergunta: "Qual o nome da famosa sobremesa de massa folhada, nozes e mel muito popular nestes países?", opcoes: ["Cheesecake", "Baklava", "Tiramisu", "Pudim"], respostaCerta: "Baklava" }
];

let perguntasSelecionadas = [];
let perguntaAtualIndex = 0;
let pontuacao = 0;

// Função para embaralhar os itens de um array
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function iniciarQuiz() {
    const todasEmbaralhadas = embaralhar([...bancoDePerguntas]);
    perguntasSelecionadas = todasEmbaralhadas.slice(0, 10);
    perguntaAtualIndex = 0;
    pontuacao = 0;
    
    document.getElementById('tela-resultado').classList.remove('ativo');
    renderizarPergunta();
}

function renderizarPergunta() {
    const container = document.getElementById('container-perguntas');
    container.innerHTML = ""; 

    const pergunta = perguntasSelecionadas[perguntaAtualIndex];
    
    const opcoesEmbaralhadas = embaralhar([...pergunta.opcoes]);

    let htmlOpcoes = "";
    opcoesEmbaralhadas.forEach(opcao => {
        const valor = (opcao === pergunta.respostaCerta) ? "certa" : "errada";
        htmlOpcoes += `
        <label class="botao-opcao">
            <input type="radio" name="qAtual" value="${valor}"> ${opcao}
        </label>`;
    });

    const html = `
        <fieldset class="bloco-pergunta ativo">
            <div class="contador-perguntas">${perguntaAtualIndex + 1} / 10</div>
            <legend class="texto-pergunta">${pergunta.pergunta}</legend>
            <div class="lista-opcoes">
                ${htmlOpcoes}
            </div>
            <button class="botao-proximo" onclick="verificarResposta()">Responder</button>
        </fieldset>
    `;
    
    container.innerHTML = html;
}

function verificarResposta() {
    const opcoes = document.getElementsByName('qAtual');
    let opcaoSelecionada = null;

    for (let opcao of opcoes) {
        if (opcao.checked) {
            opcaoSelecionada = opcao;
            break;
        }
    }

    if (!opcaoSelecionada) {
        alert("Por favor, selecione uma resposta antes de continuar!");
        return;
    }

    // Trava as opções e aplica estilo de certo ou errado
    for (let opcao of opcoes) {
        let label = opcao.parentElement;
        opcao.disabled = true;
        
        if (opcao.value === "certa") {
            label.classList.add("certo");
        } else if (opcao.checked && opcao.value === "errada") {
            label.classList.add("errado");
        }
    }

    if (opcaoSelecionada.value === "certa") {
        pontuacao++;
    }

    const botao = document.querySelector('.botao-proximo');
    
    if (perguntaAtualIndex === 9) {
        botao.innerText = "Ver Resultado";
        botao.onclick = mostrarResultado;
    } else {
        botao.innerText = "Próxima Pergunta ➔";
        botao.onclick = () => {
            perguntaAtualIndex++;
            renderizarPergunta();
        };
    }
}

function mostrarResultado() {
    document.getElementById('container-perguntas').innerHTML = ""; // Esconde pergunta
    document.getElementById('tela-resultado').classList.add('ativo'); // Mostra final
    document.getElementById('acertos').innerText = pontuacao;
}

function reiniciarQuiz() {
    iniciarQuiz(); 
}

window.onload = iniciarQuiz;