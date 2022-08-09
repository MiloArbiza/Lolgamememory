//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null; 
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 60; //cambiar valor al terminar
let tiempoInicial = 60; //cambiar valor al terminar
let tiempoRegresivoId = null;

//Sonidos
let clickAudio = new Audio('./Sonido/click.wav');
let errorAudio = new Audio('./Sonido/error.wav');
let bienAudio = new Audio('./Sonido/nice.mp3');
let loseAudio = new Audio('./Sonido/lose.wav');
let victoriaAudio = new Audio('./Sonido/victoria.mp3');


// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo_restante");
let restartButton = document.createElement('botonDereset');


// Generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

// Funcion para desordenar los numeros del array
numeros = numeros.sort(()=>{return Math.random()-0.5});
//console.log(numeros);

// Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        tiempo--;
        mostrarTiempo.innerHTML = `Tiempo: ${tiempo} segundos`;
        if(tiempo == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjeta();
            loseAudio.play();
        }

    },1000,);
}



//Funcion bloquear tarjetas
function bloquearTarjeta(){
    for(let i = 0; i <= 19; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="/imagenes/${numeros[i]}.PNG" alt="#">`;
        tarjetaBloqueada.disabled = true;
    }
}

//Reset de pagina
function resetear(){
    location.reload();
}

//Funcion principal (Destapar tarjetas)
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }



    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)

    if(tarjetasDestapadas == 1){
        //Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        //tarjeta1.innerHTML = primerResultado;
        tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.PNG" alt="#1">`;
        //click audio
        clickAudio.play();
        //deshabilitar primer boton
        tarjeta1.disabled = true;
        //tarjetasDestapadas++;

        

    }else if(tarjetasDestapadas == 2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id]
        //tarjeta2.innerHTML = segundoResultado;
        tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.PNG" alt="#2">`;
        //deshabilitar boton 2
        tarjeta2.disabled = true;
        //tarjetasDestapadas++;
        

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //cerar contador de tarjetas destapadas
            tarjetasDestapadas = 0;
            bienAudio.play();

            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos ${aciertos}`;

            if(aciertos == 10){
                victoriaAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`
                mostrarTiempo.innerHTML = `Tu tiempo fue ${tiempoInicial - tiempo} seg`
                mostrarMovimientos.innerHTML = `Movimientos ${movimientos}`
            }


        }else{
            //Mostrar momentaneamente valores de tarjetas y volver a tapar
            errorAudio.play();
            setTimeout(()=>{
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800)
        }
        
    }
    
}