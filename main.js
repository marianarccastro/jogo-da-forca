
let palavras = ["algoritmo", "alicate", "dinossauro", "computador", "girafa", "mochila", "impressora", "tradutor", "porcelana", "frigideira"];
let palavraSorteada = palavras[Math.floor(Math.random()*palavras.length)].toUpperCase();

console.log(palavraSorteada);

//cria os espaços onde ficará a palavra
for (let i = 0; i < palavraSorteada.length; i++){
	let espaco = document.createElement('p');
	espaco.innerHTML = '_';
	document.querySelector('#palavra-escondida').appendChild(espaco);
	espaco.setAttribute('id',i);
}

let letrasAcertadas = 0;
let letraEscondida = '';
let tentativas = 7;
let imagem = document.querySelector('#imagem-forca')

const listaDeTeclas = document.querySelectorAll('.tecla');
for (let i = 0; i < listaDeTeclas.length; i++){
	let tecla = listaDeTeclas[i];
	tecla.onclick = function () {
		verifica (tecla);
	}	
}

function verifica(tecla){
	let letraEscolhida = tecla.value;
	let acertouLetra = false;

		for (let i = 0; i < palavraSorteada.length; i++){
			if (letraEscolhida == palavraSorteada.charAt(i)){
				letraEscondida = document.getElementById(i);
				letraEscondida.innerHTML = palavraSorteada.charAt(i);
				acertouLetra = true;
				letrasAcertadas++;
			}
		}
		
		if (!acertouLetra && tentativas > 0){
			tentativas--;
			let novoSrcImg = `imagens/forca${tentativas}.png`
			imagem.setAttribute('src', novoSrcImg);
		}

		if (tentativas == 0){
			alert ('Suas tentativas acabaram! A palavra é ' + palavraSorteada);
		}

		if (letrasAcertadas == palavraSorteada.length){
			alert ('Parabéns! Você acertou!');
		}

		if (acertouLetra){
			tecla.classList.add('tecla_acertou');
		} else {
			tecla.classList.add('tecla_errou');
		}

		tecla.setAttribute('disabled','true');	
		
}