let N_FILAS = 10;
let N_COLUMNAS = 10;

window.onload = main();

function main() {

    let contenedorTabla = document.getElementById("contenedorTabla");

    contenedorTabla.innerHTML = "";

    let tabla = "<table>";
    let header = "";
    let char = 64; // == A

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

    for (let i = 0; i < N_FILAS; i++) {
        tabla += "<tr> <th>" + i + "</th> "
        for (let x = 0; x < N_COLUMNAS; x++) {
            tabla += "<td> X </td>";
        }
        tabla += "</tr>";
    }

    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;
}