// Variáveis globais
let carroEsportivo;
let caminhao;

// Elementos de áudio
const audioBuzina = document.getElementById("audioBuzina");
const audioAceleracao = document.getElementById("audioAceleracao");
const audioFrenagem = document.getElementById("audioFrenagem");
const audioLigar = document.getElementById("audioLigar");
const audioDesligar = document.getElementById("audioDesligar");

// Classes (mantendo as já definidas)
class Carro {
    constructor(modelo, cor) {
        this.modelo = modelo;
        this.cor = cor;
        this.ligado = false;
        this.velocidade = 0;
        this.velocidadeMaxima = 180; // Velocidade máxima padrão
    }

    ligar() {
        if (!this.ligado) {
            this.ligado = true;
            atualizarInterface();
            playAudio(audioLigar);
            return "Carro ligado!";
        } else {
            return "O carro já está ligado.";
        }
    }

    desligar() {
        if (this.ligado) {
            this.ligado = false;
            this.velocidade = 0;
            atualizarInterface();
            playAudio(audioDesligar);
            return "Carro desligado!";
        } else {
            return "O carro já está desligado.";
        }
    }

    acelerar(incremento) {
        if (!this.ligado) {
            return "O carro precisa estar ligado para acelerar.";
        }

        if (this.velocidade + incremento > this.velocidadeMaxima) {
            this.velocidade = this.velocidadeMaxima;
            atualizarInterface();
            return "Velocidade máxima atingida!";
        }
        this.velocidade += incremento;
        atualizarInterface();
        playAudio(audioAceleracao);
        return `Velocidade aumentada para ${this.velocidade} km/h.`;

    }

    frear(decremento) {
        if (this.velocidade === 0) {
            return "O carro já está parado.";
        }
        this.velocidade -= decremento;
        if (this.velocidade < 0) {
            this.velocidade = 0;
        }
        atualizarInterface();
        playAudio(audioFrenagem);
        return `Velocidade reduzida para ${this.velocidade} km/h.`;

    }

    buzinar() {
        playAudio(audioBuzina);
        return "Beep! Beep!";
    }
}

class CarroEsportivo extends Carro {
    constructor(modelo, cor) {
        super(modelo, cor);
        this.turboAtivado = false;
        this.velocidadeMaxima = 250;
    }

    ativarTurbo() {
        if (!this.ligado) {
            return "O carro precisa estar ligado para ativar o turbo.";
        }

        if (this.turboAtivado) {
            return "O turbo já está ativado.";
        }

        this.turboAtivado = true;
        this.velocidadeMaxima = 300;
        atualizarInterface();
        return "Turbo ativado!";
    }

    desativarTurbo() {
        this.turboAtivado = false;
        this.velocidadeMaxima = 250;
        atualizarInterface();
        return "Turbo desativado.";
    }

    acelerar(incremento) {
        if (!this.ligado) {
            return "O carro precisa estar ligado para acelerar.";
        }

        if (this.velocidade + incremento > this.velocidadeMaxima) {
            this.velocidade = this.velocidadeMaxima;
            atualizarInterface();
            return "Velocidade máxima atingida!";
        }
        this.velocidade += incremento;
        atualizarInterface();
        playAudio(audioAceleracao);
        return `Velocidade aumentada para ${this.velocidade} km/h.`;

    }
}

class Caminhao extends Carro {
    constructor(modelo, cor, capacidadeCarga) {
        super(modelo, cor);
        this.capacidadeCarga = capacidadeCarga;
        this.cargaAtual = 0;
        this.velocidadeMaxima = 120;
    }

    carregar(quantidade) {
        if (quantidade <= 0) {
            return "A quantidade a carregar deve ser maior que zero.";
        }

        if (this.cargaAtual + quantidade > this.capacidadeCarga) {
            return "Capacidade máxima de carga excedida.";
        }
        this.cargaAtual += quantidade;
        atualizarInterface();
        return `Caminhão carregado. Carga atual: ${this.cargaAtual} kg.`;
    }

    descarregar(quantidade) {
        if (quantidade <= 0) {
            return "A quantidade a descarregar deve ser maior que zero.";
        }

        if (this.cargaAtual - quantidade < 0) {
            return "Não é possível descarregar mais do que o caminhão possui.";
        }
        this.cargaAtual -= quantidade;
        atualizarInterface();
        return `Caminhão descarregado. Carga atual: ${this.cargaAtual} kg.`;
    }

    ativarTurbo() {
        return "Caminhões não possuem turbo.";
    }

    acelerar(incremento) {
        if (!this.ligado) {
            return "O caminhão precisa estar ligado para acelerar.";
        }

        if (this.velocidade + incremento > this.velocidadeMaxima) {
            this.velocidade = this.velocidadeMaxima;
            atualizarInterface();
            return "Velocidade máxima atingida!";
        }
        this.velocidade += incremento;
        atualizarInterface();
        playAudio(audioAceleracao);
        return `Velocidade aumentada para ${this.velocidade} km/h.`;

    }
}

// Funções de criação
function criarCarroEsportivo() {
    const modelo = document.getElementById("modeloEsportivo").value;
    const cor = document.getElementById("corEsportivo").value;
    carroEsportivo = new CarroEsportivo(modelo, cor);
    atualizarInterface();
}

function criarCaminhao() {
    const modelo = document.getElementById("modeloCaminhao").value;
    const cor = document.getElementById("corCaminhao").value;
    const capacidadeCarga = parseInt(document.getElementById("capacidadeCarga").value);
    caminhao = new Caminhao(modelo, cor, capacidadeCarga);
    atualizarInterface();
}

// Funções de interação
function ligarCarroEsportivo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.ligar());
}

function desligarCarroEsportivo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.desligar());
}

function acelerarCarroEsportivo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.acelerar(10));
}

function buzinarCarroEsportivo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.buzinar());
}

function ativarTurbo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.ativarTurbo());
}

function ligarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    showAlert(caminhao.ligar());
}

function desligarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    showAlert(caminhao.desligar());
}

function acelerarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    showAlert(caminhao.acelerar(5));
}

function buzinarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    showAlert(caminhao.buzinar());
}

function carregarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    const quantidade = parseInt(document.getElementById("quantidadeCarga").value);
    showAlert(caminhao.carregar(quantidade));
}

// Funções auxiliares
function atualizarInterface() {
    // Carro Esportivo
    const carroEsportivoStatus = document.getElementById("carroEsportivoStatus");
    const carroEsportivoVelocidade = document.getElementById("carroEsportivoVelocidade");
    const carroEsportivoVelocidadeValor = document.getElementById("carroEsportivoVelocidadeValor");

    if (carroEsportivo) {
        carroEsportivoStatus.textContent = carroEsportivo.ligado ? "Ligado" : "Desligado";
        carroEsportivoStatus.className = carroEsportivo.ligado ? "ligado" : "desligado";
        carroEsportivoVelocidade.value = carroEsportivo.velocidade;
        carroEsportivoVelocidadeValor.textContent = `${carroEsportivo.velocidade} km/h`;
    } else {
        carroEsportivoStatus.textContent = "Desligado";
        carroEsportivoStatus.className = "desligado";
        carroEsportivoVelocidade.value = 0;
        carroEsportivoVelocidadeValor.textContent = "0 km/h";
    }

    // Caminhão
    const caminhaoStatus = document.getElementById("caminhaoStatus");
    const caminhaoVelocidade = document.getElementById("caminhaoVelocidade");
    const caminhaoVelocidadeValor = document.getElementById("caminhaoVelocidadeValor");
    const caminhaoCargaAtual = document.getElementById("caminhaoCargaAtual");
    const caminhaoCapacidadeCarga = document.getElementById("caminhaoCapacidadeCarga");

    if (caminhao) {
        caminhaoStatus.textContent = caminhao.ligado ? "Ligado" : "Desligado";
        caminhaoStatus.className = caminhao.ligado ? "ligado" : "desligado";
        caminhaoVelocidade.value = caminhao.velocidade;
        caminhaoVelocidadeValor.textContent = `${caminhao.velocidade} km/h`;
        caminhaoCargaAtual.textContent = caminhao.cargaAtual + " kg";
        caminhaoCapacidadeCarga.textContent = caminhao.capacidadeCarga + " kg";
    } else {
        caminhaoStatus.textContent = "Desligado";
        caminhaoStatus.className = "desligado";
        caminhaoVelocidade.value = 0;
        caminhaoVelocidadeValor.textContent = "0 km/h";
        caminhaoCargaAtual.textContent = "0 kg";
        caminhaoCapacidadeCarga.textContent = "0 kg";
    }
}

function showAlert(message) {
    const alertContainer = document.getElementById("alert-container");
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    alertDiv.textContent = message;
    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000); // Remove o alerta após 3 segundos
}

function playAudio(audioElement) {
    audioElement.currentTime = 0; // Reinicia o áudio
    audioElement.play();
}

// Volume control
const volumeControl = document.getElementById("volume");
volumeControl.addEventListener("input", function() {
    const volume = volumeControl.value;
    audioBuzina.volume = volume;
    audioAceleracao.volume = volume;
    audioFrenagem.volume = volume;
    audioLigar.volume = volume;
    audioDesligar.volume = volume;
});

// Inicialização
atualizarInterface();