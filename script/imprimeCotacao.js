const lista = document.querySelector('[data-lista]')

//função para receber nome da moeda e a cotação
function imprimeCotacao(nome, valor){
    lista.innerHTML = '';
    // aqui devido ao figma pedir a cotação de 1 / 10 / 100 / 100 criamos nosso for para começar com 1 e ir multiplicando ate 1000
    for(let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10){
        //criamos um li  dentro da variavel lista item e colocamos para exibir valor mult/nome e valor total
        const listaItem = document.createElement('li');
        listaItem.innerHTML = `${multiplicador} ${nome}: R$${(valor * multiplicador).toFixed(2)}`
        //inserimos na nossa lista
        lista.appendChild(listaItem);
    }
}

export default imprimeCotacao;