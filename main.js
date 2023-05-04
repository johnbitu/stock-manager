const nomeProduto = document.querySelector('#name');
const btnCadastrar = document.querySelector('.btn-cadastrar');
const resultado = document.querySelector('#saida');
const botaoLimpar = document.querySelector('.btn-excluir');
let produtos = [];


function carregaProdutosDoLocalStorage() {
	if (localStorage.hasOwnProperty('produtos')) {
		produtos = JSON.parse(localStorage.getItem('produtos'));
		produtos.forEach(produto => criaProdutoHTML(produto));
	}
}


function salvaProduto(produto) {
	produtos.push(produto);
	localStorage.setItem('produtos', JSON.stringify(produtos));
}


function criaProdutoHTML(produto) {
	const p = document.createElement('p');
	const botaoApagar = document.createElement('button');
	botaoApagar.innerHTML = 'Apagar';
	botaoApagar.classList.add('botao-apagar');
	p.innerHTML = `${produto} ${botaoApagar.outerHTML}`;
	resultado.appendChild(p);
}

function removeProduto(produtoHTML) {
	const index = Array.from(resultado.children).indexOf(produtoHTML);
	if (index > -1) {
		produtos.splice(index, 1);
		localStorage.setItem('produtos', JSON.stringify(produtos));
	}
	produtoHTML.remove();
}

// function removeProduto(produtoHTML) {
// 	const texto = produtoHTML.textContent.trim().replace('Apagar', '');
// 	const index = produtos.indexOf(texto);
// 	if (index > -1) {
// 		produtos.splice(index, 1);
// 		localStorage.setItem('produtos', JSON.stringify(produtos));
// 	}
// 	produtoHTML.remove();

// // 	for (let produto of produtos) {
// // 		if (produto === produtoHTML.innerText.trim()) {
// // 				let indexProduto = produtos.indexOf(produto)
// // 				produtos.splice(indexProduto, 1)
// // 				localStorage.setItem('produtos', JSON.stringify(produtos));
// // 				alert(produto)
// // 		}

// // }
// }


function limparTudo() {
	localStorage.removeItem('produtos');
	produtos = [];
	resultado.innerHTML = '';
}




btnCadastrar.addEventListener('click', function (e) {
	e.preventDefault();
	const nome = nomeProduto.value.trim();
	if (nome !== '') {
		salvaProduto(nome);
		criaProdutoHTML(nome);
		nomeProduto.focus();
	} else {
		alert('Preencha os dados');
	}
	nomeProduto.value = '';
});


resultado.addEventListener('click', function (e) {
	const el = e.target;
	if (el.classList.contains('botao-apagar')) {
		const p = el.parentElement;
		removeProduto(p);
	}
});


botaoLimpar.addEventListener('click', function (e) {
	e.preventDefault();
	limparTudo();
});

carregaProdutosDoLocalStorage();
