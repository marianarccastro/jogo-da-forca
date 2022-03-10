
const palavras = ["algoritmo", "alicate", "dinossauro", "computador", "girafa", "mochila", "impressora", "tradutor", "porcelana", "frigideira"];
const palavraSorteada = palavras[Math.floor(Math.random()*palavras.length)].toUpperCase();
let letrasAcertadas = 0;
let letraEscondida;
let letraEscolhida;
let tentativas = 7;
let imagem = document.querySelector('#imagem-forca')
const resultado = document.querySelector('#resultado');
const listaDeTeclas = document.querySelectorAll('.tecla');
listaDeTeclas.forEach( tecla => tecla.onclick = function(){verifica(tecla)});

console.log(palavraSorteada);
criaEspacoPalavra();

function criaEspacoPalavra(){
	for (let i = 0; i < palavraSorteada.length; i++){
		let espaco = document.createElement('p');
		espaco.innerHTML = '_';
		document.querySelector('#palavra-escondida').appendChild(espaco);
		espaco.setAttribute('id',i);
	}
}

function imprimeLetra(){
	for (let i = 0; i < palavraSorteada.length; i++){
		if (letraEscolhida == palavraSorteada.charAt(i)){
			letraEscondida = document.getElementById(i);
			letraEscondida.innerHTML = palavraSorteada.charAt(i);
			letrasAcertadas++;
		}
	}
}

function desenhaForca(){
	tentativas--;
	let novoSrcImg = `imagens/forca${tentativas}.png`
	imagem.setAttribute('src', novoSrcImg);
}

function fimDoJogo(){
	if (letrasAcertadas == palavraSorteada.length || tentativas == 0){
		listaDeTeclas.forEach(botao => botao.setAttribute('disabled','true'));
		return true;
	}
}

function imprimeResultado(){
	if (letrasAcertadas == palavraSorteada.length){
		resultado.innerHTML = 'Parabéns!!! Você acertou!';
	} else if (tentativas == 0){
		resultado.innerHTML = `Suas tentativas acabaram! A palavra é ${palavraSorteada}`;
	}
}

function verifica(tecla){
	letraEscolhida = tecla.value;
	tecla.setAttribute('disabled','true');

	if (palavraSorteada.includes(letraEscolhida)){
		imprimeLetra();
		tecla.classList.add('tecla_acertou');
	} else {
		desenhaForca();
		tecla.classList.add('tecla_errou');
	}

	if (fimDoJogo()){
		imprimeResultado();
	}
}