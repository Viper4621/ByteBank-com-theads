import imprimeCotacao from "./imprimeCotacao.js";
const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
  });
//criamos uma função assincrona para esperar a busca da api de cotação e abaixo criamos o armazenamento para transformar
//atraves do json em dados para utilizarmos
setInterval(()=> conectaApi(), 5000);
  async function conectaApi(){
    const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    const conectaTraduzido = await conecta.json();
    //aqui criamos uma let pois tem alteração de data para acessar a função de pegar hora minutos e segundos
    let tempo = gerarHorario();
    //aqui de acordo com a api de cotação para buscar dentro do objeto USDBRL o valor ask que é o preço da cotação
    let valor = conectaTraduzido.USDBRL.ask;
    adicionarDados(graficoParaDolar, tempo , valor)
    //depois de pronta a função imprime cotação agora colocamos na nossa função 
    imprimeCotacao("dolar", valor);
  }
//aqui definimos um intervalo de requisição para atualizar os dados da função acima



//criamos um função abaixo para pegar horario horas minutos e segundos
function gerarHorario(){
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    console.log(horario)
    return horario;
}
//função com 3 parametros
//grafico que vamos criar / data / labels para acessar os dados do chart.js e pegar labels push é para inserir na lista
function adicionarDados(grafico, legenda, dados){
    grafico.data.labels.push(legenda);
    //abaixo é igual acima no caso da estrutura de dados do data chart.js para acessar o data e push para inserir na lista
    grafico.data.datasets.forEach((dataset) =>{
        dataset.data.push(dados);
    })
    //documentação diz para sempre no final usar abaixo para receber e atualizar o grafico
    grafico.update();
}