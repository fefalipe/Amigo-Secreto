let amigos = [];

const DOM = {
    campoNome: document.getElementById('amigo'),
    listaAmigos: document.getElementById('listaAmigos'),
    resultado: document.getElementById('resultado'),
    botaoReiniciar: document.getElementById('botao-reiniciar'),
    botaoAdicionar: document.getElementById('botao-adicionar'),
    botaoSortear: document.getElementById('botao-sortear')
};

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemNaTela() {
    exibirTextoNaTela('h1', 'Sorteio do Amigo Secreto');
    exibirTextoNaTela('h2', 'Digite o nome dos participantes');
}

function embaralhar(amigos){
    for (let i = amigos.length - 1; i > 0; i--){
        const j=Math.floor(Math.random()*(i+1));
        [amigos[i], amigos[j]]=[amigos[j], amigos[i]];
    }
}

exibirMensagemNaTela();

function adicionarAmigo(){
    let campoNome = DOM.campoNome;
    let nome = campoNome.value.trim();
    if (nome == ''){
        alert('Por favor, digite o nome de um amigo no campo indicado');
        return;
    }
    if (amigos.map(amigo => amigo.toLowerCase()).includes(nome.toLowerCase())){
        alert('Este nome já foi adicionado.');
        campoNome.value = '';
        return;
    }
    amigos.push(nome);
    atualizarLista();
    campoNome.value = '';
    campoNome.focus();
}

function atualizarLista(){
    let listaAmigos = DOM.listaAmigos;
    listaAmigos.innerHTML = '';
        for( let i = 0; i< amigos.length; i++){
        let amigo = document.createElement('li');
        amigo.textContent = amigos[i];
        listaAmigos.appendChild(amigo);
    }
    
}

function sortearAmigo(){
    if (amigos.length < 3){
        alert('Adicione pelo menos 3 nomes de amigos para realizar o sorteio.');
        return;
    }
    embaralhar(amigos);
    const elementoResultado = DOM.resultado;
    elementoResultado.innerHTML = ``;
    for (let i=0; i<amigos.length; i++){
        let indiceAmigoSecreto = (i === amigos.length -1)? 0 : i+1;
        let parSorteado = document.createElement('p');
        parSorteado.innerHTML = `${amigos[i]} &rarr; ${amigos[indiceAmigoSecreto]}`;
        elementoResultado.appendChild(parSorteado);
    }
    DOM.botaoReiniciar.disabled = false;
}

function reiniciarSorteio(){
    amigos = [];
    DOM.listaAmigos.innerHTML = '';
    DOM.resultado.textContent = '';
    DOM.campoNome.value = '';
    DOM.botaoReiniciar.disabled = true;
    alert('Sorteio reiniciado. Pronto para começar de novo!');
}

DOM.botaoAdicionar.addEventListener('click', adicionarAmigo);
DOM.botaoSortear.addEventListener('click', sortearAmigo);
DOM.botaoReiniciar.addEventListener('click', reiniciarSorteio);