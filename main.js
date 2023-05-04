const inputProduto = document.querySelector('#name');
const botao = document.querySelector('.btn')
const resultado = document.querySelector('.resultado')
const botaoLimpar = document.querySelector('.del')
const produtosJSON = JSON.parse(localStorage.getItem('produtos'));

const produtos = [];

// Verifica se o usuário já tinha salvado dados antes, se tiver, ele vai carregá-los antes de colocar os novos
if (localStorage.hasOwnProperty('produtos')) {
  produtos.push(...produtosJSON);
  produtos.forEach(produto => criaProduto(produto))
}


// salva no localStorage e cria o elemento html
function salvaProduto() {

  botao.addEventListener('click', function (e) {
    e.preventDefault();

    const inputProdutoValue = inputProduto.value;
    produtos.push(inputProdutoValue);

    localStorage.setItem('produtos', JSON.stringify(produtos));
    console.log(produtos);
    criaProduto(inputProdutoValue);
    inputProduto.focus()
    inputProduto.value = '';
  });
}

// cria o produto html
function criaProduto(textoInput) {
  const p = document.createElement('p');
  const span = document.createElement('span');
  p.innerHTML = textoInput;
  resultado.appendChild(span);
  span.appendChild(p);
  apagar(p, span)
}


// apagar tanto do localStorage quanto os elementos html
function apagar(p, span) {
  p.innerHTML += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerHTML = 'Apagar'
  botaoApagar.setAttribute('class', 'botao-apagar')
  span.appendChild(botaoApagar);

  botaoApagar.addEventListener('click', function (e) {
    e.preventDefault();
    const indexP = produtos.indexOf(p.innerHTML.replace(' Apagar', ''));
    if (indexP > -1) {
      produtos.splice(indexP, 1);
      localStorage.setItem('produtos', JSON.stringify(produtos));
    }
    span.remove();

    // verifica se o elemento html é igual o do localStorage, se for ele deleta do localstorage 
    //
    for (let produto of produtos) {
      if (produto === p.innerText.trim()) {
        let indexProduto = produtos.indexOf(produto)
        produtos.splice(indexProduto, 1)
        localStorage.setItem('produtos', JSON.stringify(produtos));
      }
    }
  });
}


// limpa o localStorage
function limparTudo() {
  localStorage.removeItem('produtos');
  produtos = [];
  resultado.innerHTML = '';
}


// evento pra limpar o localStorage
botaoLimpar.addEventListener('click', function (e) {
  e.preventDefault();
  limparTudo();
});

salvaProduto();