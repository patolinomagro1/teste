// Array de pizzas tradicionais
const pizzasTradicionais = [
    { id: 1, nome: "(#1)Calabresa", ingredientes: "Calabresa, Mussarela, Molho de tomate, Azeitona e Orégano. + Cebola Opcional", preco: 30 },
    { id: 2, nome: "(#2)Baiana", ingredientes: "Calabresa Moída Apimentada, Mussarela, Molho de tomate, Azeitona e Orégano", preco: 35 },
    { id: 3, nome: "(#3)Frango", ingredientes: "Frango, Milho, Molho de tomate, Mussarela, Azeitona e Orégano", preco: 37 },
    { id: 4, nome: "(#4)Frango com Catupiry", ingredientes: "Frango, Catupiry, Molho de tomate, Mussarela, Azeitona e Orégano", preco: 38 },
    { id: 5, nome: "(#5)Napolitana", ingredientes: "Presunto, Tomate picado, Manjericão, Molho de tomate, Mussarela, Azeitona e Orégano", preco: 40 },
    { id: 6, nome: "(#6)Marguerita", ingredientes: "Tomate, Molho de tomate, Mussarela, Azeitona e Orégano", preco: 36 }
];

// Array de pizzas especiais
const pizzasEspeciais = [
    { id: 7, nome: "(#7)Tamo junto", ingredientes: "Calabresa, Frango, Milho, Mussarela, Molho de tomate, Azeitona e Orégano", preco: 38 },
    { id: 8, nome: "(#8)Balakubana", ingredientes: "Presunto, Frango, Bacon, Mussarela, Molho de tomate, Azeitona e Orégano", preco: 36 },
    { id: 9, nome: "(#9)B-R-O BRÓ", ingredientes: "Carne de sol, Geleia de pimenta, Mussarela, Molho de tomate, Azeitona e Orégano", preco: 30 },
    { id: 10, nome: "(#10)Califórnia", ingredientes: "Frango, Geleia de pimenta, Mussarela, Molho de tomate, Azeitona e Orégano.", preco: 35 },
    { id: 11, nome: "(#11)Nordestina", ingredientes: "Carne de sol, Mussarela, Molho de tomate, Azeitona e Orégano.", preco: 37 },
    { id: 12, nome: "(#12)Frango ao creme", ingredientes: "Frango, Creme de leite, Mussarela, Molho de tomate, Azeitona e Orégano.", preco: 40 },
    { id: 13, nome: "(#13)Franbacon", ingredientes: "Frango, Bacon, Mussarela, Molho de tomate, Azeitona e Orégano.", preco: 36 },
    { id: 14, nome: "(#14)Calabacon", ingredientes: "Calabresa, Bacon, Mussarela, Tomate, Molho de tomate, Azeitona e Orégano", preco: 30 },
    { id: 15, nome: "(#15)Portuguesa", ingredientes: "Presunto, Calabresa, Bacon, Ovo Cozido, Mussarela, Molho de tomate, Azeitona e Orégano.", preco: 35 },
    { id: 16, nome: "(#16)Pizza Fricassê", ingredientes: "Frango, Milho, Batata palha, Mussarela, Molho de tomate, Azeitona e Orégano.", preco: 37 },
    { id: 17, nome: "(#17)Pizza pepperoni", ingredientes: "Frango, Presunto, Calabresa, Milho, Mussarela, Molho de tomate, Azeitona e Orégano.", preco: 40 },
];

// Array de pizzas premium
const pizzasPremium = [
    { id: 18, nome: "(#18)DESERTO", ingredientes: "Carne Seca, Tomate Seco, Manjericão, Mussarela, Molho de tomate, Azeitona e Orégano.", preco: 40 },
    { id: 19, nome: "(#19)PIZZA SRN", ingredientes: "Carne Seca, Queijo Coalho, Bacon, Manjericão, Mussarela, Molho de tomate, Azeitona e Orégano. + opcional Mel", preco: 45 },
    { id: 20, nome: "(#20)Pizza La Fúria", ingredientes: "Queijo Especial, Linguiça Calabresa, Molho de tomate e Azeitona.", preco: 0 } // Preço inicial será 0, pois será definido na função de cálculo
];

// Função para buscar informações da pizza pelo número
function buscarPizza() {
    const numeroPizza = document.getElementById('pizzaNumber').value.replace('#', ''); // Obtém o número da pizza do input e remove o caractere '#'
    const pizzaSelecionada = [...pizzasTradicionais, ...pizzasEspeciais, ...pizzasPremium].find(pizza => pizza.id == numeroPizza); // Procura a pizza pelo número (id)

    if (pizzaSelecionada) {
        document.getElementById('pizzaInfo').innerHTML = `
            <h3>${pizzaSelecionada.nome}</h3>
            <p>Ingredientes: ${pizzaSelecionada.ingredientes}</p>
            <p>Preço: R$ ${calcularPrecoPorTamanho(pizzaSelecionada, 'pequena').toFixed(2)} (P), R$ ${calcularPrecoPorTamanho(pizzaSelecionada, 'media').toFixed(2)} (M), R$ ${calcularPrecoPorTamanho(pizzaSelecionada, 'grande').toFixed(2)} (G)</p>
            <div>
                <button class="btn btn-secondary btn-sm" onclick="adicionarAoCarrinho(${pizzaSelecionada.id}, 'pequena')">P</button>
                <button class="btn btn-secondary btn-sm" onclick="adicionarAoCarrinho(${pizzaSelecionada.id}, 'media')">M</button>
                <button class="btn btn-secondary btn-sm" onclick="adicionarAoCarrinho(${pizzaSelecionada.id}, 'grande')">G</button>
            </div>
        `; // Exibe o nome, ingredientes e preço da pizza, além de botões para escolher o tamanho e adicionar ao carrinho
    } else {
        document.getElementById('pizzaInfo').innerHTML = '<p>Pizza não encontrada.</p>'; // Exibe mensagem se a pizza não for encontrada
    }
}

// Função para adicionar pizza ao carrinho
let carrinho = []; // Inicializa o carrinho como um array vazio

function adicionarAoCarrinho(idPizza, tamanho) {
    const pizza = [...pizzasTradicionais, ...pizzasEspeciais, ...pizzasPremium].find(p => p.id === idPizza); // Encontra a pizza pelo id
    if (pizza) {
        const precoTamanho = calcularPrecoPorTamanho(pizza, tamanho); // Calcula o preço da pizza de acordo com o tamanho
        carrinho.push({ ...pizza, tamanho, preco: precoTamanho }); // Adiciona a pizza com o tamanho e preço ajustado ao carrinho
        atualizarCarrinho(); // Atualiza a exibição do carrinho
    }
}

// Função para calcular o preço da pizza de acordo com o tamanho
function calcularPrecoPorTamanho(pizza, tamanho) {
    if (pizzasTradicionais.includes(pizza)) {
        // Preço fixo para pizzas tradicionais
        if (tamanho === 'pequena') return 32.90;
        if (tamanho === 'media') return 37.90;
        if (tamanho === 'grande') return 42.90;
    } else if (pizzasEspeciais.includes(pizza)) {
        // Preço fixo para pizzas especiais
        if (tamanho === 'pequena') return 34.90;
        if (tamanho === 'media') return 41.90;
        if (tamanho === 'grande') return 46.90;
    } else if (pizzasPremium.includes(pizza)) {
        // Preço fixo para pizzas premium
        if (pizza.nome === "Pizza La Fúria") {
            if (tamanho === 'pequena') return 44.90;
            if (tamanho === 'media') return 50.90;
            if (tamanho === 'grande') return 55.90;
        } else {
            if (tamanho === 'pequena') return 39.90;
            if (tamanho === 'media') return 44.90;
            if (tamanho === 'grande') return 49.90;
        }
    }
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '<h3>Seu Carrinho</h3>'; // Título do carrinho

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML += '<p>Carrinho vazio.</p>'; // Mensagem se o carrinho estiver vazio
    } else {
        carrinho.forEach(item => {
            carrinhoDiv.innerHTML += `
                <p>${item.nome} (${item.tamanho}) - R$ ${item.preco.toFixed(2)}</p>
            `; // Exibe cada item do carrinho
        });
    }
}

// Função para adicionar pizzas ao carrossel
function adicionarPizzasAoCarousel(pizzas, listaId) {
    const lista = document.getElementById(listaId);
    pizzas.forEach((pizza, index) => {
        const precoPequena = calcularPrecoPorTamanho(pizza, 'pequena');
        const precoMedia = calcularPrecoPorTamanho(pizza, 'media');
        const precoGrande = calcularPrecoPorTamanho(pizza, 'grande');

        const ativo = index === 0 ? 'active' : ''; // Define o primeiro item como ativo
        lista.innerHTML += `
            <div class="carousel-item ${ativo}">
                <div class="pizzaCard">
                    <h3>${pizza.nome}</h3>
                    <p>${pizza.ingredientes}</p>
                    <p>Preço Pequena: R$ ${precoPequena.toFixed(2)}</p>
                    <p>Preço Média: R$ ${precoMedia.toFixed(2)}</p>
                    <p>Preço Grande: R$ ${precoGrande.toFixed(2)}</p>
                    <div>
                        <button class="btn btn-secondary btn-sm" onclick="adicionarAoCarrinho(${pizza.id}, 'pequena')">P</button>
                        <button class="btn btn-secondary btn-sm" onclick="adicionarAoCarrinho(${pizza.id}, 'media')">M</button>
                        <button class="btn btn-secondary btn-sm" onclick="adicionarAoCarrinho(${pizza.id}, 'grande')">G</button>
                    </div>
                </div>
            </div>
        `; // Cria um item no carrossel para cada pizza
    });
}

// Chamada das funções para adicionar pizzas aos carrosséis
adicionarPizzasAoCarousel(pizzasTradicionais, 'listaTradicionais');
adicionarPizzasAoCarousel(pizzasEspeciais, 'listaEspeciais');
adicionarPizzasAoCarousel(pizzasPremium, 'listaPremium');

// Função para enviar o pedido pelo WhatsApp
function enviarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de enviar o pedido.");
        return;
    }

    let total = 0;
    const mensagem = carrinho.map(item => {
        total += item.preco;
        return `- ${item.nome} (${item.tamanho}): R$ ${item.preco.toFixed(2)}`;
    }).join('%0A');

    const numeroWhatsApp = '5589981454044'; // Insira aqui o número de WhatsApp desejado
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=Olá, gostaria de fazer o seguinte pedido:%0A${mensagem}%0A%0ATotal: R$ ${total.toFixed(2)}`;
    window.open(urlWhatsApp); // Abre o link do WhatsApp para enviar a mensagem
}
