//======================================================================
// VARIABLES
//======================================================================
let miCanvas = document.querySelector('#pizarra');
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;
// Marca el nuevo punto
let nuevaPosicionX = 0;
let nuevaPosicionY = 0;

let posicion = miCanvas.getBoundingClientRect()
correccionX = posicion.x;
correccionY = posicion.y;

miCanvas.width = 500;
miCanvas.height = 500;


var text =  document.getElementById("pruebita")

/* FUNCIONES


/* Funcion que empieza a dibujar la linea */

function empezarDibujo() {
    pintarLinea = true;
    lineas.push([]);
};

/* Funcion que guarda la posicion de la nueva línea */

function guardarLinea() {
    lineas[lineas.length - 1].push({
        x: nuevaPosicionX,
        y: nuevaPosicionY,
        temp: timeSegMiliseg()
    });

    text.innerHTML = timeSegMiliseg() + `<p> Posicion x = ${nuevaPosicionX}  Posicion y = ${nuevaPosicionY}  </p>`
}

/*  Funcion dibuja la linea */

function dibujarLinea(event) {
    event.preventDefault();
    if (pintarLinea) {
        let ctx = miCanvas.getContext('2d')
        // Estilos de linea
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.lineWidth = 10;
        // Color de la linea
        ctx.strokeStyle = '#fff';
        // Marca el nuevo punto
        if (event.changedTouches == undefined) {
            // Versión ratón
            nuevaPosicionX = event.layerX;
            nuevaPosicionY = event.layerY;
        } else {
            // Versión touch, pantalla tactil
            nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
            nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
        }
        // Guarda la linea
        guardarLinea();
        // Redibuja todas las lineas guardadas
        ctx.beginPath();
        lineas.forEach(function (segmento) {
            ctx.moveTo(segmento[0].x, segmento[0].y);
            segmento.forEach(function (punto, index) {
                ctx.lineTo(punto.x, punto.y);
            });
        });
        ctx.stroke();
    }
}

/* Funcion que deja de dibujar la linea */

function pararDibujar () {
    pintarLinea = false;
    guardarLinea();
}


/*Funcion que permite tener segundos y milisegundos */

function timeSegMiliseg(){
    var date = new Date()
    var TimeData =  date.getSeconds() + ":" +  date.getMilliseconds() 
    return TimeData   
}


// EVENTOS

// Eventos raton
miCanvas.addEventListener('mousedown', empezarDibujo, false);
miCanvas.addEventListener('mousemove', dibujarLinea, false);
miCanvas.addEventListener('mouseup', pararDibujar, false);

// Eventos pantallas táctiles
miCanvas.addEventListener('touchstart', empezarDibujo, false);
miCanvas.addEventListener('touchmove', dibujarLinea, false);





