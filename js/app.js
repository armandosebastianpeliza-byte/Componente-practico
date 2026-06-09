let vectorNumerico = [];
console.log("JS cargado correctamente");

// Capturo elementos del HTML para usarlos en JS
let selectDimension = document.getElementById('select-dimension-arreglo');
let btnCargar = document.getElementById('btn-cargar-vector');
let btnPresentar = document.getElementById('btn-presentar-vector');
let btnVaciar = document.getElementById('btn-vaciar-vector');
let btnMayor = document.getElementById('btn-numero-mayor');
let btnMenor = document.getElementById('btn-numero-menor');
let btnSuma = document.getElementById('btn-sumar-valores');
let btnProducto = document.getElementById('btn-producto-vector');
let btnModa = document.getElementById('btn-calcular-moda');
let btnMedia = document.getElementById('btn-calcular-media');
let btnMediana = document.getElementById('btn-calcular-mediana');
let btnOrdenSeleccion = document.getElementById('btn-orden-seleccion');
let btnOrdenBurbuja = document.getElementById('btn-orden-burbuja');
let selectOrden = document.getElementById('select-tipo-orden');
let txtRespuesta = document.getElementById('id-txt-respuesta');
let tbodyVector = document.getElementById('id-body-vector');
let txtBuscar = document.getElementById('id-txt-buscar');
let btnBuscar = document.getElementById('btn-buscar-valor');

// Pinta la tabla inicial con índices y ceros usando 2 ciclos for
function mostrarVectorInicial(dimension) {
    tbodyVector.innerHTML = "";

    // Primer for: crea la fila de índices 0, 1, 2...
    let filaIndices = tbodyVector.insertRow();
    for (let i = 0; i < dimension; i++) {
        let celda = filaIndices.insertCell();
        celda.textContent = i;
        celda.style.fontWeight = "bold";
        celda.style.backgroundColor = "#d0d0d0";
        celda.style.textAlign = "center";
    }

    // Segundo for: crea la fila de ceros
    let filaValores = tbodyVector.insertRow();
    for (let i = 0; i < dimension; i++) {
        let celda = filaValores.insertCell();
        celda.textContent = 0;
        celda.style.textAlign = "center";
    }
}

// Pinta la tabla con los valores reales del vector usando 2 ciclos for
function mostrarVector() {
    tbodyVector.innerHTML = "";

    // Primer for: fila de índices
    let filaIndices = tbodyVector.insertRow();
    for (let i = 0; i < vectorNumerico.length; i++) {
        let celda = filaIndices.insertCell();
        celda.textContent = i;
        celda.style.fontWeight = "bold";
        celda.style.backgroundColor = "#d0d0d0";
        celda.style.textAlign = "center";
    }

    // Segundo for: fila de valores del vector
    let filaValores = tbodyVector.insertRow();
    for (let i = 0; i < vectorNumerico.length; i++) {
        let celda = filaValores.insertCell();
        celda.textContent = vectorNumerico[i];
        celda.style.textAlign = "center";
    }
}

// Al cargar la página muestra la tabla vacía según la dimensión
document.addEventListener('DOMContentLoaded', function() {
    let dimensionInicial = parseInt(selectDimension.value);
    mostrarVectorInicial(dimensionInicial);
});

// Cuando cambia la dimensión reinicia el vector y pinta ceros
selectDimension.addEventListener('change', function() {
    let nuevaDimension = parseInt(selectDimension.value);
    vectorNumerico = [];
    mostrarVectorInicial(nuevaDimension);
    txtRespuesta.value = "Dimension cambiada a " + nuevaDimension;
});

// Botón Cargar Vector: genera números aleatorios del 1 al 100
btnCargar.addEventListener('click', function(e) {
    let dimension = parseInt(selectDimension.value);
    vectorNumerico = [];

    for (let i = 0; i < dimension; i++) {
        vectorNumerico[i] = Math.floor(Math.random() * 100) + 1;
    }

    txtRespuesta.value = "Vector cargado con " + dimension + " elementos. Clic en Presentar Vector";
});

// Botón Presentar Vector: muestra en tabla los valores del vector
btnPresentar.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Primero cargue el vector";
        return;
    }
    mostrarVector();
    txtRespuesta.value = "Vector presentado";
});

// Botón Vaciar: limpia el vector y deja la tabla con ceros
btnVaciar.addEventListener('click', function(e) {
    vectorNumerico = [];
    let dimension = parseInt(selectDimension.value);
    mostrarVectorInicial(dimension);
    txtRespuesta.value = "Vector vaciado";
});

// Botón Número Mayor: recorre el vector para encontrar el valor máximo y su posición
btnMayor.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let mayor = vectorNumerico[0]; let posicion = 0;
    for (let i = 1; i < vectorNumerico.length; i++) { if (vectorNumerico[i] > mayor) { mayor = vectorNumerico[i]; posicion = i; } }
    txtRespuesta.value = "Valor Maximo: " + mayor + " (posicion " + posicion + ")";
});

// Botón Número Menor: recorre el vector para encontrar el valor mínimo y su posición
btnMenor.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let menor = vectorNumerico[0]; let posicion = 0;
    for (let i = 1; i < vectorNumerico.length; i++) { if (vectorNumerico[i] < menor) { menor = vectorNumerico[i]; posicion = i; } }
    txtRespuesta.value = "Valor Minimo: " + menor + " (posicion " + posicion + ")";
});

// Botón Sumar Valores: suma todos los elementos del vector con un for
btnSuma.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let suma = 0; for (let i = 0; i < vectorNumerico.length; i++) { suma += vectorNumerico[i]; }
    txtRespuesta.value = "Suma Total: " + suma;
});

// Botón Producto Vector: multiplica todos los elementos del vector
btnProducto.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let producto = 1; for (let i = 0; i < vectorNumerico.length; i++) { producto *= vectorNumerico[i]; }
    txtRespuesta.value = "Producto Total: " + producto;
});

// Botón Calcular Media: suma todos los valores y divide entre la cantidad
btnMedia.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let suma = 0; for (let i = 0; i < vectorNumerico.length; i++) { suma += vectorNumerico[i]; }
    txtRespuesta.value = "Media: " + (suma / vectorNumerico.length).toFixed(2);
});

// Botón Calcular Mediana: ordena el vector y saca el valor del centro
btnMediana.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let vectorOrdenado = copiarVector(vectorNumerico);
    vectorOrdenado = ordenarBurbuja(vectorOrdenado, 'ASC');
    let mediana; let n = vectorOrdenado.length;
    if (n % 2 == 0) { mediana = (vectorOrdenado[n/2 - 1] + vectorOrdenado[n/2]) / 2; }
    else { mediana = vectorOrdenado[Math.floor(n/2)]; }
    txtRespuesta.value = "Mediana: " + mediana.toFixed(2);
});

// Botón Calcular Moda: cuenta repeticiones con 2 for anidados
btnModa.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let moda = vectorNumerico[0]; let maxRepeticiones = 0;
    for (let i = 0; i < vectorNumerico.length; i++) {
        let repeticiones = 0;
        for (let j = 0; j < vectorNumerico.length; j++) { if (vectorNumerico[i] == vectorNumerico[j]) { repeticiones++; } }
        if (repeticiones > maxRepeticiones) { maxRepeticiones = repeticiones; moda = vectorNumerico[i]; }
    }
    if(maxRepeticiones == 1) { txtRespuesta.value = "No hay moda"; }
    else { txtRespuesta.value = "Moda: " + moda + " se repite " + maxRepeticiones + " veces"; }
});

// Función copiarVector: duplica el arreglo para no modificar el original
function copiarVector(arr) {
    let nuevo = []; for(let i = 0; i < arr.length; i++) { nuevo[i] = arr[i]; } return nuevo;
}

// Función ordenarBurbuja: ordena comparando pares de elementos. Funciona para ASC y DESC
function ordenarBurbuja(arr, tipo) {
    let temp = copiarVector(arr);
    for(let i = 0; i < temp.length - 1; i++) {
        for(let j = 0; j < temp.length - 1 - i; j++) {
            if(tipo == 'ASC') { if(temp[j] > temp[j + 1]) { let aux = temp[j]; temp[j] = temp[j + 1]; temp[j + 1] = aux; } }
            else { if(temp[j] < temp[j + 1]) { let aux = temp[j]; temp[j] = temp[j + 1]; temp[j + 1] = aux; } }
        }
    }
    return temp;
}

// Botón Orden Selección: ordena el vector buscando el menor en cada vuelta
function ordenarSeleccion() {
    let temp = copiarVector(vectorNumerico);
    for(let i = 0; i < temp.length - 1; i++) {
        let posMin = i;
        for(let j = i + 1; j < temp.length; j++) { if(temp[j] < temp[posMin]) { posMin = j; } }
        let aux = temp[i]; temp[i] = temp[posMin]; temp[posMin] = aux;
    }
    vectorNumerico = temp; mostrarVector();
}

btnOrdenSeleccion.addEventListener('click', ordenarSeleccion);

// Botón Orden Burbuja: ordena el vector según ASC o DESC seleccionado
btnOrdenBurbuja.addEventListener('click', function() {
    let tipo = selectOrden.value;
    vectorNumerico = ordenarBurbuja(vectorNumerico, tipo);
    mostrarVector();
});

// Botón Buscar Valor: recorre el vector buscando si el valor existe
btnBuscar.addEventListener('click', function() {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let valor = parseInt(txtBuscar.value);
    for (let i = 0; i < vectorNumerico.length; i++) {
        if (vectorNumerico[i] == valor) {
            txtRespuesta.value = "Valor " + valor + " encontrado en posicion " + i;
            return;
        }
    }
    txtRespuesta.value = "Valor " + valor + " no se encuentra";
});