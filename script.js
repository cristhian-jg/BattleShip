let N_FILAS = 10;
let N_COLUMNAS = 10;


window.onload = main();

function main() {

    let contenedorTabla = document.getElementById("contenedorTabla");
    let controles = document.getElementById("controles");

    contenedorTabla.innerHTML = "";
    controles.innerHTML = "";

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

    let selectionLetra = document.getElementById("letraSeleccionada");
    let letraSeleccionada = selectionLetra.options[selectionLetra.selectedIndex].value;

    let selectionNumero = document.getElementById("numeroSeleccionado");
    let numeroSeleccionado = selectionNumero.options[selectionNumero.selectedIndex].value;

    console.log("Letra: " + letraSeleccionada + " Numero: " + numeroSeleccionado);

    document.getElementById("casilla" + numeroSeleccionado + letraSeleccionada).innerHTML = " ";
}