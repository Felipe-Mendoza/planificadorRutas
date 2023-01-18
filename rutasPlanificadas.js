//funcion que renderiza el array itinerario en la tabla de html

const arregloRutasCreadas = JSON.parse(localStorage.getItem('arregloRutasCreadas')) || []

console.log(arregloRutasCreadas)
function mostrarRutas() {



    // Ahora dibujamos la tabla
    const $cuerpoTabla2 = document.querySelector("#tablaRutasPlanificadas");

    // Recorrer todos los productos
    arregloRutasCreadas.forEach(rutaCreada => {
        // Crear un <tr>
        let id = rutaCreada.id
        const $tr = document.createElement("tr");
          // Creamos el <td> de nombre y lo adjuntamos a tr
          let $tdNoRuta = document.createElement("td");
          $tdNoRuta.textContent = rutaCreada.ruta; // el textContent del td es el nombre
          $tr.appendChild($tdNoRuta);

        // Creamos el <td> de nombre y lo adjuntamos a tr
        let $tdNombre = document.createElement("td");
        $tdNombre.textContent = rutaCreada.nombreC; // el textContent del td es el nombre
        $tr.appendChild($tdNombre);
        // El td de nombre
        let $tdTransp = document.createElement("td");
        $tdTransp.textContent = rutaCreada.Transpo;
        $tr.appendChild($tdTransp);
        // El td de direccion
        let $tdPlaca = document.createElement("td");
        $tdPlaca.textContent = rutaCreada.placa;
        $tr.appendChild($tdPlaca);
        // El td de direccion
        let $tdpedido = document.createElement("td");
        $tdpedido.textContent = rutaCreada.tpedidos;
        $tr.appendChild($tdpedido);
        // El td de direccion
        let $tdbultos = document.createElement("td");
        $tdbultos.textContent = rutaCreada.tbultos;
        $tr.appendChild($tdbultos);



        // Finalmente agregamos el <tr> al cuerpo de la tabla
        $cuerpoTabla2.appendChild($tr);
        // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
        // agregarLocalStorage ()
    })
  



}

mostrarRutas();

function redireccionar() {
    location.href = "./planificador.html";
}