 //======================================================================
        // VARIABLES
        //======================================================================
        let miCanvas = document.querySelector('#pizarra');
        let lineas = [];
        let correccionX = 0;
        let correccionY = 0;
        let pintarLinea = false;
        let nuevaPosicionX = 0;
        let nuevaPosicionY = 0;

        let posicion = miCanvas.getBoundingClientRect();
        correccionX = posicion.x;
        correccionY = posicion.y;

        miCanvas.width = 500;
        miCanvas.height = 500;

        //======================================================================
        // FUNCIONES
        //======================================================================

        /**
         * Función que empieza a dibujar la línea
         */
        function empezarDibujo() {
            pintarLinea = true;
            lineas.push([]);
            const birthday = new Date();
            console.log(`${birthday.getHours()}:${birthday.getMinutes()}:${birthday.getSeconds()}:${birthday.getMilliseconds()}`);
        }

        /**
         * Función que guarda la posición de la nueva línea
         */
        function guardarLinea() {
            lineas[lineas.length - 1].push({
                x: nuevaPosicionX,
                y: nuevaPosicionY
            });
        }

        /**
         * Función que dibuja la línea
         */
        function dibujarLinea(event) {
            event.preventDefault();
            if (pintarLinea) {
                let ctx = miCanvas.getContext('2d');
                // Estilos de línea
                ctx.lineJoin = ctx.lineCap = 'round';
                ctx.lineWidth = 10;
                // Color de la línea
                ctx.strokeStyle = '#fff';
                // Marca el nuevo punto
                if (event.changedTouches === undefined) {
                    // Versión ratón
                    nuevaPosicionX = event.layerX;
                    nuevaPosicionY = event.layerY;
                } else {
                    // Versión touch, pantalla táctil
                    nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
                    nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
                }
                // Guarda la línea
                guardarLinea();
                // Redibuja todas las líneas guardadas
                ctx.beginPath();
                lineas.forEach(function (segmento) {
                    ctx.moveTo(segmento[0].x, segmento[0].y);
                    segmento.forEach(function (punto) {
                        ctx.lineTo(punto.x, punto.y);
                    });
                });
                ctx.stroke();
                console.log(lineas);
            }
        }

        /**
         * Función que deja de dibujar la línea
         */
        function pararDibujar() {
            pintarLinea = false;
            guardarLinea();
            const birthday = new Date();
            console.log(`${birthday.getHours()}:${birthday.getMinutes()}:${birthday.getSeconds()}`);
        }

        //======================================================================
        // EVENTOS
        //======================================================================

        // Eventos ratón
        miCanvas.addEventListener('mousedown', empezarDibujo, false);
        miCanvas.addEventListener('mousemove', dibujarLinea, false);
        miCanvas.addEventListener('mouseup', pararDibujar, false);

        // Eventos pantallas táctiles
        miCanvas.addEventListener('touchstart', empezarDibujo, false);
        miCanvas.addEventListener('touchmove', dibujarLinea, false);
        miCanvas.addEventListener('touchmove', handleTouchMove, false);

        // Función para manejar eventos touchmove
        function handleTouchMove(e) {
            // Obtiene el elemento h1
            const h1 = document.getElementById("h1P");
            
            // Empieza con una cadena vacía
            let content = '';
            
            // Itera sobre todos los toques activos
            for (let i = 0; i < e.targetTouches.length; i++) {
                let touch = e.targetTouches[i];
                // Verifica si la propiedad force está disponible
                let force = touch.force !== undefined ? touch.force : 'force no soportada';
                // Añade el valor de la fuerza a la cadena de contenido
                content += `<p style="color:red"> targetTouches[${i}].force = ${force} </p>`;
            }
            
            // Actualiza el innerHTML del elemento h1
            h1.innerHTML = content;
        }