let vectorNumerico = [];
console.log("JS cargado correctamente");

// Capturo todos los elementos del HTML para usarlos después
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

// 1. Cargar vector con números aleatorios del 1 al 100
btnCargar.addEventListener('click', function(e) {
    let dimension = parseInt(selectDimension.value);
    vectorNumerico = [];

    // Lleno el vector usando ciclo for. Random para generar datos de prueba
    for (let i = 0; i < dimension; i++) {
        vectorNumerico[i] = Math.floor(Math.random() * 100) + 1;
    }

    mostrarVector();
    txtRespuesta.value = "Vector cargado con " + dimension + " elementos";
});

// 2. Vaciar vector poniendo todos en 0
btnVaciar.addEventListener('click', function(e) {
    for (let i = 0; i < vectorNumerico.length; i++) {
        vectorNumerico[i] = 0;
    }
    mostrarVector();
    txtRespuesta.value = "Vector vaciado";
});

// 3. Función para mostrar el vector en la tabla HTML
function mostrarVector() {
    const tabla = document.getElementById('id-table-vector-numerico');

    // Borro la fila anterior si existe para no duplicar datos
    if (tabla.rows.length > 2) {
        tabla.deleteRow(1);
    }

    const fila = tabla.insertRow(1);

    // Recorro el vector y creo una celda por cada número
    for (let i = 0; i < vectorNumerico.length; i++) {
        const celda = fila.insertCell();
        celda.textContent = vectorNumerico[i];
    }

    // Completo con celdas vacías hasta 10 para que la tabla se vea pareja
    for (let i = vectorNumerico.length; i < 10; i++) {
        const celda = fila.insertCell();
        celda.textContent = '';
    }
}

// 4. Buscar valor máximo recorriendo todo el vector
btnMayor.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Error: Vector vacio";
        return;
    }
    let mayor = vectorNumerico[0];
    let posicion = 0;
    // Comparo cada elemento con el mayor actual
    for (let i = 1; i < vectorNumerico.length; i++) {
        if (vectorNumerico[i] > mayor) {
            mayor = vectorNumerico[i];
            posicion = i;
        }
    }
    txtRespuesta.value = "Valor Maximo: " + mayor + " (posicion " + posicion + ")";
});

// 5. Buscar valor mínimo, misma lógica que mayor pero al revés
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

// 6. Sumar todos los elementos del vector
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

// 7. Multiplicar todos los elementos. Empiezo en 1 porque 0 anula todo
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

// 8. Calcular media = suma total dividido entre cantidad de elementos
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

// 9. Mediana: valor del medio. Si es par, promedio de los 2 del centro
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

// 10. Moda: número que más se repite. Uso 2 ciclos para contar repeticiones
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

// Función auxiliar para copiar vectores sin afectar el original
function copiarVector(arr) {
    let nuevo = [];
    for(let i = 0; i < arr.length; i++) {
        nuevo[i] = arr[i];
    }
    return nuevo;
}

// Algoritmo Burbuja: compara pares y los va intercambiando hasta ordenar
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

// Algoritmo Selección: busca el menor y lo pone al inicio, repite
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

btnOrdenSeleccion.addEventListener('click', ordenarSeleccion);

btnOrdenBurbuja.addEventListener('click', function() {
    let tipo = selectOrden.value; // 'ASC' o 'DESC' del select
    vectorNumerico = ordenarBurbuja(vectorNumerico, tipo);
    mostrarVector();
});