
const palavras = ["algoritmo", "alicate", "dinossauro", "computador", "girafa", "mochila", "impressora", "tradutor", "porcelana", "frigideira"];

let letraEscolhida;
let acertosJogada;
let acertosTotal = 0;
let tentativas = 7;

const palavraSorteada = palavras[Math.floor(Math.random()*palavras.length)].toUpperCase();

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
	acertosJogada = 0;
	for (let i = 0; i < palavraSorteada.length; i++){
		if (letraEscolhida == palavraSorteada.charAt(i)){
			let espaco = document.getElementById(i);
			espaco.innerHTML = palavraSorteada.charAt(i);
			acertosJogada++;
		}
	}
}

function desenhaForca(){
	let imagem = document.querySelector('#imagem-forca')
	let novoSrcImg = `imagens/forca${tentativas}.png`
	imagem.setAttribute('src', novoSrcImg);
}

function fimDoJogo(){
	if (acertosTotal == palavraSorteada.length || tentativas == 0){
		return true;
	}
}

function imprimeResultado(){
	const resultado = document.querySelector('#resultado');
	if (acertosTotal == palavraSorteada.length){
		resultado.innerHTML = 'Parabéns!!! Você acertou!';
	} else if (tentativas == 0){
		resultado.innerHTML = `Suas tentativas acabaram! A palavra é ${palavraSorteada}`;
	}
}

function desabilitaTodasAsTeclas(){
	listaDeTeclas.forEach(tecla => tecla.setAttribute('disabled','true'));
}

function verifica(tecla){
	letraEscolhida = tecla.value;
	tecla.setAttribute('disabled','true');

	if (palavraSorteada.includes(letraEscolhida)){
		imprimeLetra();
		acertosTotal += acertosJogada;
		tecla.classList.add('tecla_acertou');
	} else {
		tentativas--;
		desenhaForca();
		tecla.classList.add('tecla_errou');
	}

	if (fimDoJogo()){
		imprimeResultado();
		desabilitaTodasAsTeclas();
	}
}