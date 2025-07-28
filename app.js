let amigos = [];

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemNaTela() {
    exibirTextoNaTela('h1', 'Sorteio do Amigo Secreto');
    exibirTextoNaTela('h2', 'Digite o nome dos participantes');
}

exibirMensagemNaTela();

function adicionarAmigo(){
    let campoNome = document.getElementById('amigo');
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
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
        for( let i = 0; i< amigos.length; i++){
        let amigo = document.createElement('li');
        amigo.textContent = amigos[i];
        listaAmigos.appendChild(amigo);
    }
    
}

function sortearAmigo(){
    if (amigos.length < 2){
        alert('Adicione pelo menos 2 nomes de amigos para realizar o sorteio.');
        return;
    }
    const indiceDeSorteio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceDeSorteio];
    const elementoResultado = document.getElementById('resultado');
    elementoResultado.innerHTML = `O amigo secreto é: ${amigoSecreto}`;
    document.getElementById('button-reiniciar').disabled = false;
}

function reiniciar(){
    amigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').textContent = '';
    document.getElementById('amigo').value = '';
    document.getElementById('button-reiniciar').disabled = true;
    alert('Sorteio reiniciado. Pronto para começar de novo!');
}