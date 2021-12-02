function reiniciar(){
    let linhas = document.querySelector("#linhas");
    let remover = document.querySelectorAll(".linha");
    let boneco = document.querySelectorAll(".boneco");
    document.getElementById("fimJogo").innerHTML = "";
    document.getElementById("btVerificar").removeAttribute("disabled");
    document.getElementById("inputLetra").value = "";
    document.getElementById("tentativaLetra").innerHTML = ""

    remover.forEach(elemento => 
        linhas.removeChild(elemento));

    boneco.forEach(elemento => resetBoneco(elemento));
    
    iniciar()
}

function resetBoneco(elemento){
    elemento.setAttribute("class", "boneco");
    elemento.setAttribute("hidden", "true");
}

function iniciar(){
    chances = 5;
    let valor = parseInt(Math.random()*palavrasPossiveis.length);
    document.getElementById("btIniciar").setAttribute("disabled", "true");
    palavraSorteada = palavrasPossiveis[valor];
    console.log(palavraSorteada);
    palavraTentativa = new Array(palavraSorteada.length);

    let body = document.querySelector("body");
    let linhas = document.getElementById("linhas");

    for(let i=0,j=0; i<palavraSorteada.length; i++,j+=60){
        let linha = document.createElement("div");
        linha.setAttribute("class", "linha");
        
        linhas.insertAdjacentElement("beforeend",linha)
        linha.style.left = `${80 + j}px`;
    }
    
}

function verificar(){
    let letra = document.getElementById("inputLetra").value.toUpperCase();
    document.getElementById("inputLetra").value = ""

    if (letra >= 'A' && letra <= 'Z') {
        verificarLetra(palavraSorteada, letra);
    } else{
        alert("Valor Inválido. Digite uma letra entra A e Z");
    }

}

function verificarLetra(palavra, letra){
    let tentativa = document.getElementById("tentativaLetra").innerHTML;
    
    if (tentativa.match(letra)){
        alert("Você já tentou essa letra!")
    } else{
        if (palavra.match(letra)){
            //console.log("Possui a letra")
            colocarLetra(palavra, letra);
        } else{
            //console.log("NÃO Possui a letra")
            desenharBoneco();
            chances--;
            if(chances < 0){
                fimDeJogo(0);
            }
            document.getElementById("tentativaLetra").innerHTML += ` ${letra}`;
        }
    }
}

function desenharBoneco(){
    let boneco = document.querySelectorAll(".boneco");
    boneco[5-chances].removeAttribute("hidden")
}

function colocarLetra(palavra, letra){
    let linhas = document.querySelectorAll(".linha");

    for(let i=0; i<palavra.length; i++){
        if (palavra[i] == letra){
            //console.log(`Letra encontrada na posição ${i}`)
            linhas[i].innerHTML = letra;
            palavraTentativa.fill(letra,i,i+1)
        }
    }

    let palavraParcial = palavraTentativa.toString().replace(/,/g, '');

    if(palavraSorteada.localeCompare(palavraParcial) == 0){
        fimDeJogo(1);
    }
}

function fimDeJogo(ganhou){
    if(ganhou){
        document.getElementById("fimJogo").innerHTML = "VOCÊ GANHOU!";
        document.getElementById("btVerificar").setAttribute("disabled", "true");
    } else {
        document.getElementById("fimJogo").innerHTML = `FIM DE JOGO <br> A palavra era ${palavraSorteada}!`;
        let boneco = document.querySelectorAll(".boneco");
        boneco.forEach( element => 
            element.setAttribute("class", "boneco morto")
        )
        document.getElementById("btVerificar").setAttribute("disabled", "true");

    }
}

let palavraSorteada = '';
let chances = 6;
let palavraTentativa = '';

let palavrasPossiveis = ["PERIGO", "AMIZADE", "BICICLETA", "TESTAMENTO", "MOSTARDA", "MORANGO", "IMPRESSORA", "PROFESSOR", "BRUSQUETA", "ALFAJOR", "PIPOCA", "FORÇA", "FORCA", "FACA", "ABACAXI", "CARTEIRA", "TABULEIRO", "PARTICULAR", "PISTOLA", "REGISTRADORA", "DINHEIRO", "FOLHA", "MOTOCICLETA", "COELHO", "CELULAR", "MOUSE", "CAVIDADES", "EXPERIMENTOS", "LUVAS", "DITADURA", "TELHADO", "PEGADAS", "MOSQUITO", "LIQUIDIFICADOR", "MANDIOCA",  "PENDRIVE", "GATO", "FLUTUANDO", "BABACA", "VISCOSIDADE", "MUCO", "CATARRO", "GARGANTA", "BARRIGA", "PENAS", "CALCANHAR", "MANDALA", "BAZUCA", "PESCADORES", "GUILHOTINA", "CACHORRO"];