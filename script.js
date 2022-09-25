let N_FILAS = 10;
let N_COLUMNAS = 10;

let MAX_DISPAROS = 100;
let N_BARCOS = 14;

// Posicion de los barcos que estarán en la partida.
let jugadas1 = [[11, 12], [36, 37, 38], [61, 71, 81, 91], [29, 39, 49, 59, 69]];
let jugadas2 = [[80, 90], [26, 36, 46], [96, 97, 98, 99], [53, 63, 73, 83, 93]];
let jugadas3 = [[75, 76], [12, 13, 14], [47, 57, 67, 77], [92, 82, 72, 62, 52]];

let jugadas = [];

// Cada vez que el usuario haga un disparo se almacenerá la casilla que se ha disparado en este Array.
let disparos = [];

// Utilizo estos arrays para dar diferente información al usuario. 
let frasesFallo = ["Has fallado, parece que no había nada!", "No ha habido suerte, no has acertado el tiro!", "Intenta mejorar esa puntería, no le has dado a nada!"]
let frasesAcierto = ["Buen trabajo! Has acertado el tiro!", "Acierto! Justo en el blanco!", "Tu puntería es asombrosa! Has acertado el disparo!"];

// Contadores para la tabla de puntuaciones.
let contadorDisparos = 0;
let contadorDisparosFallados = 0;
let contadorDisparosAcertados = 0;

let mensaje = document.getElementById("mensaje");

function main() {

    let tablaPuntuaciones = document.getElementById("tablaPuntaciones");

    let contenedorTabla = document.getElementById("contenedorTabla");
    let controles = document.getElementById("controles");

    contadorDisparos = 0;
    contadorDisparosAcertados = 0;
    contadorDisparosFallados = 0;

    document.getElementById("Aciertos").innerHTML = 0;
    document.getElementById("Fallos").innerHTML = 0;
    document.getElementById("Disparos").innerHTML = 0;

    contenedorTabla.innerHTML = "";
    controles.innerHTML = "";
    mensaje.innerHTML = "La partida ha comenzado, dispones de " + MAX_DISPAROS + " disparos !"

    tablaPuntuaciones.style = "display; block"

    let tabla = "<table>";
    let header = "";
    let char = 65; // == A
    let select = "Apuntar <select id='letraSeleccionada'>";
    let selectNumeros = "<select id='numeroSeleccionado'>";
    let option = "";
    let optionNumeros = "";
    let identificadorCasilla = 0;

    let random = Math.floor((Math.random() * 3) + 0);

    console.log(random)
    // Carga la posición de los barcos aleatoriamente según la lista de jugadas que se asigne
    switch (random) {
        case 0:
            jugadas = jugadas1.slice();
            console.log(jugadas);

            break;
        case 1:
            jugadas = jugadas2.slice();
            console.log(jugadas);

            break;
        case 2:
            jugadas = jugadas3.slice();
            console.log(jugadas);
            break;
        default:
            console.log("Se está cargando la partida")
    }

    //console.log(jugadas);

    // Crea de manera automatica el select de letras y numeros

    for (let s = 0; s < N_COLUMNAS; s++) {
        option += "<option value= " + s + ">" + String.fromCharCode(char) + "</option>"
        char++;
        optionNumeros += '<option value="' + s + '">' + s + '</option>';
    }

    char = 64; // == @

    for (let j = -1; j < N_COLUMNAS; j++) {
        if (char > 64) {
            header += "<th>" + String.fromCharCode(char) + "</th>"
            char++;
        } else {
            header += "<th>" + " " + "</th>"
            char++;
        }
    }


    tabla += header;
    select += option;
    selectNumeros += optionNumeros;

    for (let i = 0; i < N_FILAS; i++) {
        tabla += "<tr> <th>" + i + "</th> "
        for (let x = 0; x < N_COLUMNAS; x++) {
            if (identificadorCasilla < 10) {
                tabla += "<td id = casilla0" + identificadorCasilla + "> X </td>";
                identificadorCasilla++;
            } else {
                tabla += "<td id = casilla" + identificadorCasilla + "> X </td>";
                identificadorCasilla++;
            }
        }
        tabla += "</tr>";
    }

    tabla += "</table>";
    select += "</select>";
    selectNumeros += '</select><button onclick="disparar()">Disparar</button>';
    contenedorTabla.innerHTML = tabla;
    controles.innerHTML = select + selectNumeros;
}

/**
 * Funcion que controla el disparo o jugada que va a hacer el jugador, además le muestra la información al jugador. 
 */
function disparar() {

    let disparoAcertado = false;
    let disparado = false;

    let selectionLetra = document.getElementById("letraSeleccionada");
    let letraSeleccionada = selectionLetra.options[selectionLetra.selectedIndex].value;

    let selectionNumero = document.getElementById("numeroSeleccionado");
    let numeroSeleccionado = selectionNumero.options[selectionNumero.selectedIndex].value;

    if (contadorDisparos < MAX_DISPAROS && contadorDisparosAcertados < N_BARCOS) {

        // Comprobación de si no se ha disparado ya a esa casilla.
        for (v = 0; v < disparos.length; v++) {
            if (numeroSeleccionado + "" + letraSeleccionada == disparos[v]) {
                disparado = true;
            }
        }

        // Solo se realizará el disparo si no se ha disparado a esa casilla antes, en caso contrario se informará al usuario
        if (!disparado) {
            for (k = 0; k < jugadas.length; k++) {
                for (l = 0; l < jugadas[k].length; l++) {
                    if (letraSeleccionada + "" + numeroSeleccionado == jugadas[k][l]) {
                        //debugger
                        disparoAcertado = true;
                    }
                }
            }

            // Si hay alguna coincidencia en el Array habrá acertado el disparo y se podrá la casilla con la letra B azul.
            if (disparoAcertado) {
                document.getElementById("casilla" + numeroSeleccionado + "" + letraSeleccionada).innerHTML = "B";
                document.getElementById("casilla" + numeroSeleccionado + "" + letraSeleccionada).style = "color: blue; font-weight: bold; "
                disparoAcertado = false;
                mensaje.innerHTML = frasesAcierto[Math.floor(Math.random() * frasesAcierto.length)];
                contadorDisparosAcertados++;
                disparos.push(numeroSeleccionado + "" + letraSeleccionada);
                // Sino hay coincidencias significará que no has acertado, por lo que pintará vacio.
            } else {
                document.getElementById("casilla" + numeroSeleccionado + letraSeleccionada).innerHTML = " ";
                mensaje.innerHTML = frasesFallo[Math.floor(Math.random() * frasesFallo.length)];
                contadorDisparosFallados++;
                disparos.push(numeroSeleccionado + "" + letraSeleccionada);
            }

            contadorDisparos++;

            // Actualiza la tabla de marcadores.
            document.getElementById("Aciertos").innerHTML = contadorDisparosAcertados;
            document.getElementById("Fallos").innerHTML = contadorDisparosFallados;
            document.getElementById("Disparos").innerHTML = contadorDisparos;
        } else {
            mensaje.innerHTML = "Parece que ya has disparado a esa casilla!";
        }
    } else if (contadorDisparosAcertados >= N_BARCOS) {
        mensaje.innerHTML = "Enhorabuena! Has conseguido derribar todos los barcos!";
    } else if (contadorDisparos >= MAX_DISPAROS) {
        mensaje.innerHTML = "GAME OVER! Se te ha acabado la munición, no puedes seguir jugando!";
    }
}