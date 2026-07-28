let banco;

let musicas = [];

let atual = 0;

let modoAleatorio = false;

let modoRepetir = false;

const seletor = document.getElementById("seletor");

const audio = document.getElementById("audio");

const lista = document.getElementById("lista");

const nomeMusica = document.getElementById("nomeMusica");

const play = document.getElementById("play");

const proxima = document.getElementById("proxima");

const anterior = document.getElementById("anterior");

const aleatorio = document.getElementById("aleatorio");

const repetir = document.getElementById("repetir");

const barra = document.getElementById("barra");

const tempoAtual = document.getElementById("tempoAtual");

const tempoTotal = document.getElementById("tempoTotal");

function carregarMusicas(){

    let transacao = banco.transaction(
        "musicas",
        "readonly"
    );


    let tabela = transacao.objectStore("musicas");


    let pedido = tabela.getAll();


    pedido.onsuccess = ()=>{


        musicas = pedido.result;


        lista.innerHTML="";


        musicas.forEach((musica,index)=>{


            let item = document.createElement("div");


            item.innerHTML = musica.nome;


            item.onclick=()=>{

                atual=index;

                tocar();

            };


            lista.appendChild(item);


        });


        console.log("Músicas carregadas");

    };

}
function abrirBanco() {

    const requisicao = indexedDB.open("MusicBoxDB", 1);

    requisicao.onupgradeneeded = (evento) => {

        banco = evento.target.result;

        let tabela = banco.createObjectStore("musicas", {
    keyPath: "id",
    autoIncrement: true
});

tabela.createIndex("nome", "nome");
    };

 requisicao.onsuccess = (evento) => {

    banco = evento.target.result;

    console.log("Banco aberto!");

    carregarMusicas();

};

    requisicao.onerror = () => {

        console.log("Erro ao abrir o banco.");

    };

}
function salvarNoBanco(listaMusicas){

    let transacao = banco.transaction(
        "musicas",
        "readwrite"
    );

    let tabela = transacao.objectStore("musicas");


    listaMusicas.forEach(musica=>{

        tabela.add({

    nome: musica.nome,

    arquivo: musica.arquivo

});

    });


    console.log("Músicas salvas!");

}
// Escolher pasta

seletor.addEventListener("change", ()=>{
musicas = Array.from(seletor.files)
.filter(arquivo => {

    const extensao = arquivo.name
        .split(".")
        .pop()
        .toLowerCase();


    return [
        "mp3",
        "m4a",
        "wav",
        "aac",
        "flac",
        "ogg"
    ].includes(extensao);

})
.map(arquivo => {

    return {
        nome: arquivo.name,
        arquivo: arquivo
    };

});
    

    lista.innerHTML="";


    musicas.forEach((musica,index)=>{


        let item = document.createElement("div");


        item.innerHTML = musica.name;


        item.onclick = ()=>{

            atual=index;

            tocar();

        };


        lista.appendChild(item);


    });
salvarNoBanco(musicas);

});


audio.onloadedmetadata = () => {

    barra.max = audio.duration;

    tempoTotal.innerHTML = formatarTempo(audio.duration);

};

// Tocar música

function tocar(){

    if(musicas.length === 0) return;

if(audio.src){
    URL.revokeObjectURL(audio.src);
}
function tocar(){

    if(musicas.length === 0) return;


    if(audio.src){
        URL.revokeObjectURL(audio.src);
    }


    let arquivo = URL.createObjectURL(
        musicas[atual].arquivo
    );


    audio.src = arquivo;


    nomeMusica.innerHTML =
    musicas[atual].nome;


    audio.play();


    play.innerHTML="⏸️";

}


    audio.src = arquivo;


    nomeMusica.innerHTML =
    musicas[atual].name;


    audio.play();


    play.innerHTML="⏸️";


}

function formatarTempo(segundos){

    segundos = Math.floor(segundos);

    let minutos = Math.floor(segundos / 60);

    let resto = segundos % 60;

    if(resto < 10){

        resto = "0" + resto;

    }

    return minutos + ":" + resto;

}


// Play/Pause

play.onclick = ()=>{


    if(audio.paused){

        audio.play();

        play.innerHTML="⏸️";

    }

    else{

        audio.pause();

        play.innerHTML="▶️";

    }


};


// Próxima

function proximaMusica(){

    if(modoAleatorio){

        let nova;

        do{

            nova = Math.floor(Math.random() * musicas.length);

        }while(nova === atual && musicas.length > 1);

        atual = nova;

    }else{

        atual++;

        if(atual >= musicas.length){

            atual = 0;

        }

    }

    tocar();

}

proxima.onclick = proximaMusica;




// Anterior

anterior.onclick = ()=>{


    atual--;


    if(atual < 0){

        atual=musicas.length-1;

    }


    tocar();


};
audio.onended = () => {

    if(modoRepetir){

        audio.currentTime = 0;
        audio.play();

    }else{

        proximaMusica();

    }

};
aleatorio.onclick = ()=>{

    modoAleatorio = !modoAleatorio;


    if(modoAleatorio){

        aleatorio.style.background = "green";

    }else{

        aleatorio.style.background = "";

    }

};



repetir.onclick = ()=>{

    modoRepetir = !modoRepetir;


    if(modoRepetir){

        repetir.style.background = "green";

    }else{

        repetir.style.background = "";

    }

};
audio.onloadedmetadata = () => {

    barra.max = audio.duration;

    tempoTotal.innerHTML = formatarTempo(audio.duration);

};
audio.ontimeupdate = () => {

    barra.value = audio.currentTime;

    tempoAtual.innerHTML =
        formatarTempo(audio.currentTime);

};
barra.oninput = () => {

    audio.currentTime = barra.value;

};
abrirBanco();
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("service-worker.js");

}