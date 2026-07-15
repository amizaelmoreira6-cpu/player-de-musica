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




// Tocar música

function tocar(){


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



// Próxima

proxima.onclick = ()=>{


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


};



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

        proxima();

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