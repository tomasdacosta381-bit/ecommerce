// Banco de dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Boné Peak Blinders",
        preco: 89.90,
        imagem: "https://placehold.co/300x300/black/white?text=Boné+Shelby",
        categoria: "acessorios"
    },
    {
        id: 2,
        nome: "Sobretudo Shelby",
        preco: 459.90,
        imagem: "https://placehold.co/300x300/grey/white?text=Sobretudo",
        categoria: "roupas"
    },
    {
        id: 3,
        nome: "Whiskey Shelby",
        preco: 299.90,
        imagem: "https://placehold.co/300x300/brown/white?text=Whiskey",
        categoria: "bebidas"
    }
];

let carrinho = [];

function exibirProdutos() {
    const container = document.getElementById('lista-produtos');
    if (!container) return;

    let html = '';
    produtos.forEach(produto => {
        html += `
            <div class="produto">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                <button class="btn-adicionar" data-id="${produto.id}">Adicionar ao Carrinho</button>
            </div>
        `;
    });

    container.innerHTML = html;
    adicionarListenersAosBotoes();
}

function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === idProduto);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({...produto, quantidade: 1});
    }
    
    alert(`${produto.nome} adicionado ao carrinho!`);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const container = document.getElementById('itens-carrinho');
    const totalElemento = document.getElementById('total-carrinho');
    if (!container || !totalElemento) return;

    let html = '';
    let total = 0;

    if (carrinho.length === 0) {
        html = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            html += `
                <div class="item-carrinho">
                    <h4>${item.nome}</h4>
                    <p>Quantidade: ${item.quantidade}</p>
                    <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
                    <button class="btn-remover" data-id="${item.id}">Remover</button>
                </div>
            `;
        });
    }

    container.innerHTML = html;
    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;

    document.querySelectorAll('.btn-remover').forEach(botao => {
        botao.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removerDoCarrinho(id);
        });
    });
}

function removerDoCarrinho(idProduto) {
    const index = carrinho.findIndex(item => item.id === idProduto);
    if (index !== -1) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\nEm um sistema real, você seria redirecionado para o pagamento.`);
    
    carrinho = [];
    atualizarCarrinho();
}

function adicionarListenersAosBotoes() {
    document.querySelectorAll('.btn-adicionar').forEach(botao => {
        botao.addEventListener('click', function() {
            const idProduto = parseInt(this.getAttribute('data-id'));
            adicionarAoCarrinho(idProduto);
        });
    });

    const btnFinalizar = document.getElementById('finalizar-compra');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarCompra);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    exibirProdutos();
    atualizarCarrinho();
});
