let vectorNumerico = [];
console.log("JS cargado correctamente");

let selectDimension = document.getElementById('select-dimension-arreglo');
let btnCargar = document.getElementById('btn-cargar-vector');
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
let tablaVector = document.getElementById('id-table-vector-numerico');

// 1. Cargar vector
btnCargar.addEventListener('click', function(e) {
    let dimension = parseInt(selectDimension.value);
    vectorNumerico = [];

    for (let i = 0; i < dimension; i++) {
        vectorNumerico[i] = Math.floor(Math.random() * 100) + 1;
    }

    mostrarVector();
    txtRespuesta.value = "Vector cargado con " + dimension + " elementos";
});

// 2. Vaciar vector
btnVaciar.addEventListener('click', function(e) {
    for (let i = 0; i < vectorNumerico.length; i++) {
        vectorNumerico[i] = 0;
    }
    mostrarVector();
    txtRespuesta.value = "Vector vaciado";
});

// 3. Mostrar vector en la tabla - AQUÍ ESTABA EL ERROR, YA CORREGIDO
function mostrarVector() {
    const tabla = document.getElementById('id-table-vector-numerico');

    // 1. Si ya existe una fila de datos, la borramos. Es la fila 1
    if (tabla.rows.length > 2) { // >2 porque fila 0 = titulo, fila 1 = datos viejos
        tabla.deleteRow(1);
    }

    // 2. Insertamos la nueva fila de datos justo después del titulo
    const fila = tabla.insertRow(1);

    // 3. Llenamos con los números del vector
    for (let i = 0; i < vectorNumerico.length; i++) {
        const celda = fila.insertCell();
        celda.textContent = vectorNumerico[i];
    }

    // 4. Rellenamos hasta 10 para que no se descuadre la tabla
    for (let i = vectorNumerico.length; i < 10; i++) {
        const celda = fila.insertCell();
        celda.textContent = '';
    }
}

// 4. Numero Mayor
btnMayor.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let mayor = vectorNumerico[0];
    let posicion = 0;
    for (let i = 1; i < vectorNumerico.length; i++) {
        if (vectorNumerico[i] > mayor) {
            mayor = vectorNumerico[i];
            posicion = i;
        }
    }
    txtRespuesta.value = "Valor Maximo: " + mayor + " (posicion " + posicion + ")";
});

// 5. Numero Menor
btnMenor.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let menor = vectorNumerico[0];
    let posicion = 0;
    for (let i = 1; i < vectorNumerico.length; i++) {
        if (vectorNumerico[i] < menor) {
            menor = vectorNumerico[i];
            posicion = i;
        }
    }
    txtRespuesta.value = "Valor Minimo: " + menor + " (posicion " + posicion + ")";
});

// 6. Suma
btnSuma.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let suma = 0;
    for (let i = 0; i < vectorNumerico.length; i++) {
        suma = suma + vectorNumerico[i];
    }
    txtRespuesta.value = "Suma Total: " + suma;
});

// 7. Producto
btnProducto.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let producto = 1;
    for (let i = 0; i < vectorNumerico.length; i++) {
        producto = producto * vectorNumerico[i];
    }
    txtRespuesta.value = "Producto Total: " + producto;
});

// 8. Media
btnMedia.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let suma = 0;
    for (let i = 0; i < vectorNumerico.length; i++) {
        suma = suma + vectorNumerico[i];
    }
    let media = suma / vectorNumerico.length;
    txtRespuesta.value = "Media: " + media.toFixed(2);
});

// 9. Mediana
btnMediana.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let vectorOrdenado = copiarVector(vectorNumerico);
    vectorOrdenado = ordenarBurbuja(vectorOrdenado, 'ASC');
    let mediana;
    let n = vectorOrdenado.length;
    if (n % 2 == 0) {
        mediana = (vectorOrdenado[n/2 - 1] + vectorOrdenado[n/2]) / 2;
    } else {
        mediana = vectorOrdenado[Math.floor(n/2)];
    }
    txtRespuesta.value = "Mediana: " + mediana.toFixed(2);
});

// 10. Moda
btnModa.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let moda = vectorNumerico[0];
    let maxRepeticiones = 0;
    for (let i = 0; i < vectorNumerico.length; i++) {
        let repeticiones = 0;
        for (let j = 0; j < vectorNumerico.length; j++) {
            if (vectorNumerico[i] == vectorNumerico[j]) {
                repeticiones = repeticiones + 1;
            }
        }
        if (repeticiones > maxRepeticiones) {
            maxRepeticiones = repeticiones;
            moda = vectorNumerico[i];
        }
    }
    txtRespuesta.value = "Moda: " + moda + " (se repite " + maxRepeticiones + " veces)";
});

// ================= FUNCIONES QUE FALTABAN =================

// Función para copiar vector - básica con for
function copiarVector(arr) {
    let nuevo = [];
    for(let i = 0; i < arr.length; i++) {
        nuevo[i] = arr[i];
    }
    return nuevo;
}

// Orden Burbuja - para Mediana y botón Burbuja
function ordenarBurbuja(arr, tipo) {
    let temp = copiarVector(arr);

    for(let i = 0; i < temp.length - 1; i++) {
        for(let j = 0; j < temp.length - 1 - i; j++) {
            if(tipo == 'ASC') {
                if(temp[j] > temp[j + 1]) {
                    let aux = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = aux;
                }
            } else {
                if(temp[j] < temp[j + 1]) {
                    let aux = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = aux;
                }
            }
        }
    }
    return temp;
}

// Orden Selección - el que pide el profe
function ordenarSeleccion() {
    let temp = copiarVector(vectorNumerico);

    for(let i = 0; i < temp.length - 1; i++) {
        let posMin = i;
        for(let j = i + 1; j < temp.length; j++) {
            if(temp[j] < temp[posMin]) {
                posMin = j;
            }
        }
        let aux = temp[i];
        temp[i] = temp[posMin];
        temp[posMin] = aux;
    }

    vectorNumerico = temp;
    mostrarVector();
}

// Conectar botones de ordenamiento
btnOrdenSeleccion.addEventListener('click', ordenarSeleccion);

btnOrdenBurbuja.addEventListener('click', function() {
    let tipo = selectOrden.value; // 'ASC' o 'DESC' del select
    vectorNumerico = ordenarBurbuja(vectorNumerico, tipo);
    mostrarVector();
});
