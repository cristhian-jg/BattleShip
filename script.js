let N_FILAS = 10;
let N_COLUMNAS = 10;

let jugadas = [[11, 12],[36, 37, 38],[61,71,81,91],[29,39,49,59,69]];

let frasesFallo = ["Has fallado, parece que no había nada!", "No ha habido suerte, no has acertado el tiro!", "Intenta mejorar esa puntería, no le has dado a nada!"]
let frasesAcierto = ["Buen trabajo! Has acertado el tiro!", "Acierto! Justo en el blanco!", "Tu puntería es asombrosa! Has acertado el disparo!"];

let contadorDisparos = 0;
let contadorDisparosFallados = 0;
let contadorDisparosAcertados = 0;

let mensaje = document.getElementById("mensaje");

function main() {

    let tablaPuntuaciones = document.getElementById("tablaPuntaciones");

    let contenedorTabla = document.getElementById("contenedorTabla");
    let controles = document.getElementById("controles");


    contenedorTabla.innerHTML = "";
    controles.innerHTML = "";
    mensaje.innerHTML = "La partida ha comenzado, piensa en tu primer movimiento!"
    
    tablaPuntuaciones.style = "display; block"

    let tabla = "<table>";
    let header = "";
    let char = 65; // == A
    let select = "Apuntar <select id='letraSeleccionada'>";
    let selectNumeros = "<select id='numeroSeleccionado'>";
    let option = "";
    let optionNumeros = "";
    let identificadorCasilla = 0;

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

function disparar() {

    let disparoAcertado = false;

    let selectionLetra = document.getElementById("letraSeleccionada");
    let letraSeleccionada = selectionLetra.options[selectionLetra.selectedIndex].value;

    let selectionNumero = document.getElementById("numeroSeleccionado");
    let numeroSeleccionado = selectionNumero.options[selectionNumero.selectedIndex].value;

    console.log("Letra: " + letraSeleccionada + " Numero: " + numeroSeleccionado);

        console.log("Hola" + jugadas[0][numeroSeleccionado]);

        for(k = 0; k < jugadas.length; k++) {
            for (l = 0; l < jugadas[k].length; l++) {
                console.log("Hola " + jugadas[k][l]);
                console.log("Numero: " + letraSeleccionada + "" + numeroSeleccionado);
                if (letraSeleccionada + "" + numeroSeleccionado == jugadas[k][l]) {
                    //debugger
                    disparoAcertado = true;
                }
            }
        }

        if (disparoAcertado) {
            document.getElementById("casilla" + numeroSeleccionado + "" + letraSeleccionada).innerHTML = "B";
            disparoAcertado = false;
            mensaje.innerHTML = frasesAcierto[Math.floor(Math.random() * frasesAcierto.length)];
            contadorDisparosAcertados++;
        } else {
            document.getElementById("casilla" + numeroSeleccionado + letraSeleccionada).innerHTML = " ";
            mensaje.innerHTML = frasesFallo[Math.floor(Math.random() * frasesFallo.length)];
            contadorDisparosFallados++;
        }

        contadorDisparos++;

        document.getElementById("Aciertos").innerHTML = contadorDisparosAcertados;
        document.getElementById("Fallos").innerHTML = contadorDisparosFallados;
        document.getElementById("Disparos").innerHTML = contadorDisparos;
}