// Variáveis globais para armazenar os objetos criados
let carroEsportivo;
let caminhao;

// Classe Carro (já definida anteriormente)
class Carro {
  constructor(modelo, cor) {
    this.modelo = modelo;
    this.cor = cor;
    this.ligado = false;
    this.velocidade = 0;
  }

  ligar() {
    this.ligado = true;
    atualizarCarroEsportivoInfo(); // Atualiza a exibição
    atualizarCaminhaoInfo();
    console.log("Carro ligado!");
  }

  desligar() {
    this.ligado = false;
    this.velocidade = 0;
    atualizarCarroEsportivoInfo(); // Atualiza a exibição
    atualizarCaminhaoInfo();
    console.log("Carro desligado!");
  }

  acelerar(incremento) {
    if (this.ligado) {
      this.velocidade += incremento;
      atualizarCarroEsportivoInfo(); // Atualiza a exibição
      atualizarCaminhaoInfo();
      console.log(`Velocidade aumentada para ${this.velocidade} km/h.`);
    } else {
      console.log("O carro precisa estar ligado para acelerar.");
    }
  }

  frear(decremento) {
    this.velocidade -= decremento;
    if (this.velocidade < 0) {
      this.velocidade = 0;
    }
    atualizarCarroEsportivoInfo(); // Atualiza a exibição
    atualizarCaminhaoInfo();
    console.log(`Velocidade reduzida para ${this.velocidade} km/h.`);
  }
}


// Classe CarroEsportivo (já definida anteriormente)
class CarroEsportivo extends Carro {
  constructor(modelo, cor) {
    super(modelo, cor); // Chama o construtor da classe pai (Carro)
    this.turboAtivado = false;
  }

  ativarTurbo() {
    if (this.ligado) {
      this.turboAtivado = true;
      this.acelerar(50); // Acelera mais rápido com o turbo
      atualizarCarroEsportivoInfo();
      console.log("Turbo ativado!");
    } else {
      console.log("O carro precisa estar ligado para ativar o turbo.");
    }
  }
}

// Classe Caminhao (já definida anteriormente)
class Caminhao extends Carro {
  constructor(modelo, cor, capacidadeCarga) {
    super(modelo, cor);
    this.capacidadeCarga = capacidadeCarga;
    this.cargaAtual = 0;
  }

  carregar(quantidade) {
    if (this.cargaAtual + quantidade <= this.capacidadeCarga) {
      this.cargaAtual += quantidade;
      atualizarCaminhaoInfo();
      console.log(`Caminhão carregado. Carga atual: ${this.cargaAtual} kg.`);
    } else {
      console.log("Capacidade máxima de carga excedida.");
    }
  }
}


// Funções para criar os objetos
function criarCarroEsportivo() {
  const modelo = document.getElementById("modeloEsportivo").value;
  const cor = document.getElementById("corEsportivo").value;
  carroEsportivo = new CarroEsportivo(modelo, cor);
  atualizarCarroEsportivoInfo();
}

function criarCaminhao() {
  const modelo = document.getElementById("modeloCaminhao").value;
  const cor = document.getElementById("corCaminhao").value;
  const capacidadeCarga = parseInt(document.getElementById("capacidadeCarga").value);
  caminhao = new Caminhao(modelo, cor, capacidadeCarga);
  atualizarCaminhaoInfo();
}

// Funções para interagir com o Carro Esportivo
function ligarCarroEsportivo() {
  if (carroEsportivo) {
    carroEsportivo.ligar();
  } else {
    alert("Crie o carro esportivo primeiro!");
  }
}

function desligarCarroEsportivo() {
  if (carroEsportivo) {
    carroEsportivo.desligar();
  } else {
    alert("Crie o carro esportivo primeiro!");
  }
}

function acelerarCarroEsportivo() {
  if (carroEsportivo) {
    carroEsportivo.acelerar(10);
  } else {
    alert("Crie o carro esportivo primeiro!");
  }
}

function ativarTurbo() {
  if (carroEsportivo) {
    carroEsportivo.ativarTurbo();
  } else {
    alert("Crie o carro esportivo primeiro!");
  }
}

// Funções para interagir com o Caminhão
function ligarCaminhao() {
  if (caminhao) {
    caminhao.ligar();
  } else {
    alert("Crie o caminhão primeiro!");
  }
}

function desligarCaminhao() {
  if (caminhao) {
    caminhao.desligar();
  } else {
    alert("Crie o caminhão primeiro!");
  }
}

function acelerarCaminhao() {
  if (caminhao) {
    caminhao.acelerar(5);
  } else {
    alert("Crie o caminhão primeiro!");
  }
}

function carregarCaminhao() {
  if (caminhao) {
    const quantidade = parseInt(document.getElementById("quantidadeCarga").value);
    caminhao.carregar(quantidade);
  } else {
    alert("Crie o caminhão primeiro!");
  }
}

// Funções para atualizar a exibição na tela
function atualizarCarroEsportivoInfo() {
  const infoDiv = document.getElementById("carroEsportivoInfo");
  if (carroEsportivo) {
    infoDiv.innerHTML = `
    <img src="img/florian-schneider-799KfBloSFQ-unsplash-scaled-removebg-preview.png" alt="carro">
      <p>Modelo: ${carroEsportivo.modelo}</p>
      <p>Cor: ${carroEsportivo.cor}</p>
      <p>Ligado: ${carroEsportivo.ligado}</p>
      <p>Velocidade: ${carroEsportivo.velocidade} km/h</p>
      <p>Turbo Ativado: ${carroEsportivo.turboAtivado}</p>
    `;
  } else {
    infoDiv.innerHTML = "<p>Nenhum carro esportivo criado.</p>";
  }
}

function atualizarCaminhaoInfo() {
  const infoDiv = document.getElementById("caminhaoInfo");
  if (caminhao) {
    infoDiv.innerHTML = `
    <img src="img/caminhao-de-reboque-com-carrinho-brinquedo-infantil-colorido_222693-removebg-preview.png" alt="carro">
      <p>Modelo: ${caminhao.modelo}</p>
      <p>Cor: ${caminhao.cor}</p>
      <p>Ligado: ${caminhao.ligado}</p>
      <p>Velocidade: ${caminhao.velocidade} km/h</p>
      <p>Capacidade de Carga: ${caminhao.capacidadeCarga} kg</p>
      <p>Carga Atual: ${caminhao.cargaAtual} kg</p>
    `;
  } else {
    infoDiv.innerHTML = "<p>Nenhum caminhão criado.</p>";
  }
}