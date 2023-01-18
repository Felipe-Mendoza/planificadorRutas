//***************************************Declaraciones************************************************************//


const conductores = [];
const transportes = [];
let itinerario = [];
let arregloRutasCreadas = [];
//variable que funcionara como controlador cuando agregar o no informacion
let editando = false;

let sumaPedidos = 0;
let sumaBultos = 0;

const cliente = {
    id: '',
    documento: '',
    nombre: '',
    direccion: '',
    bultos: '',
}


const objetoItinerario = {
    conductor: '',
    transporte: '',
    patente: '',
    documento: '',
    nombre: '',
    direccion: '',
    bultos: '',
}

//***************************************Query de elemento//*****************************************************//

let nameConductor = document.querySelector('#nameConductor')
let nameTransporte = document.querySelector('#nameTransporte')
let namePatente = document.querySelector('#namePatente')
let formulario = document.querySelector('#formulario')
let formulario1 = document.querySelector('#formulario1')
let inputDocumento = document.querySelector('#inputDocumento')
let nombreCliente = document.querySelector('#nombreCliente')
let direccionCliente = document.querySelector('#direccionCliente')
let cantidadBultos = document.querySelector('#cantidadBultos')
let btnAgregar = document.querySelector('#btnAgregar')
let btnNuevo = document.querySelector('#btnCrear')
let btnGuardar = document.querySelector('#btnGuardar')
let option = document.createElement('option')
let totalPedidos = document.querySelector('#totalPedidos')



let numero = JSON.parse(localStorage.getItem('numero')) || 0;

//Crea nueva ruta y vacia todos los campos
btnNuevo.addEventListener("click", () => {
    formulario1.reset();
    itinerario.length = 0;
    mostrarClientes();
    arregloRutasCreadas = JSON.parse(localStorage.getItem('arregloRutasCreadas')) || []

    if (numero == arregloRutasCreadas.length) {
        numero = numero + 1;

        localStorage.setItem('numero', JSON.stringify(numero));
        numero = JSON.parse(localStorage.getItem('numero'))

        numeroRuta.value = numero;
    } else {

        numero = JSON.parse(localStorage.getItem('numero'))
        numeroRuta.value = numero;

    }

});

btnGuardar.addEventListener("click", (e) => {

    validarFormularioItinarario(e)



})


//***************************************Funciones************************************************************//

//Carga el combo de nombre de transportistas
const cargarSelecNombre = (array) => {
    array.forEach((elemento) => {
        option = document.createElement('option')
        option.innerHTML = `    
<option value="${elemento.id}">${elemento.nombre}</option>    
    `
        nameConductor.append(option)
    })

}

//Carga el combo de nombre de empresas de transportes
const cargarSelecTransporte = (array) => {
    array.forEach((elemento) => {
        option = document.createElement('option')
        option.innerHTML = `    
<option value="${elemento.id}">${elemento.nombre}</option>    
    `
        nameTransporte.append(option)
    })

}

//Carga el combo de las patentes de los camiones
const cargarSelecPatente = (array) => {
    array.forEach((elemento) => {
        const option = document.createElement('option')
        option.innerHTML = `    
<option value="${elemento}">${elemento}</option>    
    `
        namePatente.append(option)
    })

}


//Carga la fecha actual
window.onload = function () {
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    document.getElementById('fechaActual').value = ano + "-" + mes + "-" + dia;
}

formulario.addEventListener('submit', validarFormulario);

//validacion del formulario para garantizar que esten los campos cargados
function validarFormulario(e) {
    e.preventDefault();
    if (inputDocumento.value === '' || nombreCliente.value === '' || direccionCliente.value === '' || cantidadBultos.value === '' || namePatente.value === 'Seleccione..' || nameTransporte.value === 'Seleccione..' || nameConductor.value === 'Seleccione..') {
        //Utilizacion de libreria sweetalert
        swal("", "Todos los campos son obligatorioa!", "error");
        return

    }

    if (editando) {
        editarcliente()
        editando = false;
    } else {
        cliente.id = Date.now();
        cliente.documento = inputDocumento.value;
        cliente.nombre = nombreCliente.value;
        cliente.direccion = direccionCliente.value;
        cliente.bultos = cantidadBultos.value;
        agregarCliente();
    }

}

//funcion que renderiza el array itinerario en la tabla de html

function mostrarClientes() {
    limpiar();
    let bultos = 0;
    let pedidos = 0;
    // Ahora dibujamos la tabla
    const $cuerpoTabla = document.querySelector("#tabla2");

    // Recorrer todos los clientes
    itinerario.forEach(cliente => {
        // Crear un <tr>
        let id = cliente.id
        const $tr = document.createElement("tr");

        // Creamos el <td> de documento
        let $tdDocuemento = document.createElement("td");
        $tdDocuemento.textContent = cliente.documento; 
        $tr.appendChild($tdDocuemento);
        // El td de nombre
        let $tdNombre = document.createElement("td");
        $tdNombre.textContent = cliente.nombre;
        $tr.appendChild($tdNombre);
        // El td de direccion
        let $tdDireccion = document.createElement("td");
        $tdDireccion.textContent = cliente.direccion;
        $tr.appendChild($tdDireccion);
        // El td de numero de bulto
        let $tdbulto = document.createElement("td");
        $tdbulto.textContent = cliente.bultos;
        $tr.appendChild($tdbulto);
        // Calculamos el numero de pedidos y bultos
        bultos = bultos + Number(cliente.bultos)
        pedidos += 1;
        // El boton editar que se encuentra dentro de la tabla
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarCliente(cliente);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar', 'btn-success');
        $tr.appendChild(editarBoton);
        // El boton eliminar que se encuentra dentro de la tabla
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarCliente(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        $tr.appendChild(eliminarBoton);

        // Finalmente agregamos el <tr> al cuerpo de la tabla
        $cuerpoTabla.appendChild($tr);
        // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
        // agregarLocalStorage ()
    })

    document.getElementById('totalPedidos').innerHTML = pedidos;
    document.getElementById('totalBultos').innerHTML = bultos;
    sumaPedidos = pedidos;
    sumaBultos = bultos;
  
}

let ruta = 0;
//validacion del formulario de itinerario
function validarFormularioItinarario(e) {
    e.preventDefault();
    if (namePatente.value === 'Seleccione..' || nameTransporte.value === 'Seleccione..' || nameConductor.value === 'Seleccione..' || itinerario.length <= 0) {
        //Utilizacion de libreria sweetalert
        swal("", "Debe tener registros en el itinerario!", "error");


    } else {
        //Utilizacion de libreria toastify
        Toastify({
            text: "Se ha creado la ruta correctamente",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #7CFC00, #006400)",
            },
            onClick: function () { } // Callback after click
        }).showToast();


        const rutaCreada = {
            nombreC: nameConductor.value,
            Transpo: nameTransporte.value,
            placa: namePatente.value,
            ruta: arregloRutasCreadas.length + 1,
            tpedidos: sumaPedidos,
            tbultos: sumaBultos,

        };
        arregloRutasCreadas = JSON.parse(localStorage.getItem('arregloRutasCreadas')) || []
        arregloRutasCreadas.push(rutaCreada)
        localStorage.setItem('arregloRutasCreadas', JSON.stringify(arregloRutasCreadas))
        console.log(arregloRutasCreadas)
        formulario1.reset();
        limpiar();
        document.getElementById('totalPedidos').innerHTML = 0;
        document.getElementById('totalBultos').innerHTML = 0;




    }

}

//funcion que agrega clientes al array itinerario
function agregarCliente() {
    itinerario.push({ ...cliente });
    mostrarClientes();
    formulario.reset();
    limpiarObjeto();
}
//funcion que limpia el objeto cliente una vez que es agregado al array itinerario
function limpiarObjeto() {
    cliente.id = '';
    cliente.documento = '';
    cliente.nombre = '';
    cliente.direccion = '';
    cliente.bultos = '';
}




function cargarCliente(client) {
    const { id, documento, nombre, direccion, bultos } = client;
    inputDocumento.value = documento;
    nombreCliente.value = nombre;
    direccionCliente.value = direccion;
    cantidadBultos.value = bultos;

    cliente.id = id;
    formulario.querySelector('button[type="submit"]').textContent = "Actualizar";
    editando = true;
}

function editarcliente() {
    cliente.documento = inputDocumento.value;
    cliente.nombre = nombreCliente.value;
    cliente.direccion = direccionCliente.value;
    cliente.bultos = cantidadBultos.value;

    itinerario.map(Datoscliente => {
        if (Datoscliente.id === cliente.id) {

            Datoscliente.id = cliente.id;
            Datoscliente.documento = cliente.documento;
            Datoscliente.nombre = cliente.nombre;
            Datoscliente.direccion = cliente.direccion;
            Datoscliente.bultos = cliente.bultos;
        }


    });
    limpiar();
    mostrarClientes();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarCliente(id) {

    console.log(id);
    itinerario = itinerario.filter(cliente => cliente.id !== id);
    limpiar();
    mostrarClientes();
}

function limpiar() {
    const tableClient = document.querySelector('#tabla2')
    while (tableClient.firstChild) {
        tableClient.removeChild(tableClient.firstChild)
    }
}


//***************************************Ejecuciones************************************************************//
//Utilizacion de fetch para cargar los combos de condutores, transporte y patentes

fetch('../json/condutores.json')
    .then((res) => res.json())
    .then((data) => {

        cargarSelecNombre(data)
    })

fetch('../json/transporte.json')
    .then((res) => res.json())
    .then((data) => {

        cargarSelecTransporte(data)
    })

fetch('../json/patentes.json')
    .then((res) => res.json())
    .then((data) => {

        cargarSelecPatente(data)
    })

