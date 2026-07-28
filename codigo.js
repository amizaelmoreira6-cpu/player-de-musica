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
    let arquivo = URL.createObjectURL(
        musicas[atual]
    );


    audio.src = arquivo;


    nomeMusica.innerHTML =
    musicas[atual].name;


    audio.play();


    play.innerHTML="⏸️";


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

audio.ontimeupdate = () => {

    barra.value = audio.currentTime;

    tempoAtual.innerHTML =
        formatarTempo(audio.currentTime);

};
barra.oninput = () => {

    audio.currentTime = barra.value;

};

function formatarTempo(segundos){

    segundos = Math.floor(segundos);

    let minutos = Math.floor(segundos / 60);

    let resto = segundos % 60;

    if(resto < 10){

        resto = "0" + resto;

    }

    return minutos + ":" + resto;

}

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
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("service-worker.js");

}