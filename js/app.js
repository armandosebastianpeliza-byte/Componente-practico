let vectorNumerico = [];
console.log("JS cargado correctamente");

// ============================================
// CAPTURA DE ELEMENTOS DEL DOM
// ============================================
// Aquí guardo referencias a todos los botones e inputs para usarlos después
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

// ============================================
// FUNCIONES DE VISUALIZACIÓN - TABLA
// ============================================
/*
ALGORITMO MOSTRAR TABLA INICIAL
Idea: Pinta 2 filas usando 2 ciclos for.
Fila 1: Muestra los índices 0, 1, 2... para que el usuario sepa la posición.
Fila 2: Inicializa todos los valores en 0.
Uso: Se ejecuta al cambiar la dimensión o al vaciar el vector.
*/
function mostrarVectorInicial(dimension) {
    tbodyVector.innerHTML = "";
    // Ciclo 1: Genera fila de índices
    let filaIndices = tbodyVector.insertRow();
    for (let i = 0; i < dimension; i++) {
        let celda = filaIndices.insertCell();
        celda.textContent = i;
        celda.style.fontWeight = "bold";
        celda.style.backgroundColor = "#d0d0d0";
        celda.style.textAlign = "center";
    }
    // Ciclo 2: Genera fila de ceros
    let filaValores = tbodyVector.insertRow();
    for (let i = 0; i < dimension; i++) {
        let celda = filaValores.insertCell();
        celda.textContent = 0;
        celda.style.textAlign = "center";
    }
}

/*
ALGORITMO MOSTRAR VECTOR CON DATOS
Idea: Similar al anterior pero en vez de ceros, muestra los valores reales guardados en vectorNumerico.
Uso: Se ejecuta después de cargar, ordenar o modificar el vector.
*/
function mostrarVector() {
    tbodyVector.innerHTML = "";
    let filaIndices = tbodyVector.insertRow();
    for (let i = 0; i < vectorNumerico.length; i++) {
        let celda = filaIndices.insertCell();
        celda.textContent = i;
        celda.style.fontWeight = "bold";
        celda.style.backgroundColor = "#d0d0d0";
        celda.style.textAlign = "center";
    }
    let filaValores = tbodyVector.insertRow();
    for (let i = 0; i < vectorNumerico.length; i++) {
        let celda = filaValores.insertCell();
        celda.textContent = vectorNumerico[i];
        celda.style.textAlign = "center";
    }
}

// ============================================
// EVENTOS INICIALES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    let dimensionInicial = parseInt(selectDimension.value);
    mostrarVectorInicial(dimensionInicial);
});

selectDimension.addEventListener('change', function() {
    let nuevaDimension = parseInt(selectDimension.value);
    vectorNumerico = [];
    mostrarVectorInicial(nuevaDimension);
    txtRespuesta.value = "Dimension cambiada a " + nuevaDimension;
});

// ============================================
// BOTÓN CARGAR VECTOR
// ============================================
/*
ALGORITMO CARGA ALEATORIA
Idea: Llena el vector con números enteros aleatorios entre 1 y 100.
Fórmula: Math.floor(Math.random() * 100) + 1 genera números del 1 al 100.
Complejidad: O(n) porque recorre el vector 1 sola vez.
*/
btnCargar.addEventListener('click', function(e) {
    let dimension = parseInt(selectDimension.value);
    vectorNumerico = [];
    for (let i = 0; i < dimension; i++) {
        vectorNumerico[i] = Math.floor(Math.random() * 100) + 1;
    }
    txtRespuesta.value = "Vector cargado con " + dimension + " elementos. Clic en Presentar Vector";
});

// ============================================
// BOTÓN PRESENTAR / VACIAR
// ============================================
btnPresentar.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) {
        txtRespuesta.value = "Primero cargue el vector";
        return;
    }
    mostrarVector();
    txtRespuesta.value = "Vector presentado";
});

btnVaciar.addEventListener('click', function(e) {
    vectorNumerico = [];
    let dimension = parseInt(selectDimension.value);
    mostrarVectorInicial(dimension);
    txtRespuesta.value = "Vector vaciado";
});

// ============================================
// ALGORITMO MAYOR - BÚSQUEDA DE MÁXIMO
// ============================================
/*
IDEA DEL ALGORITMO MAYOR:
Asumo que el primer elemento es el mayor. Luego recorro todo el vector.
Si encuentro uno más grande, lo guardo como nuevo mayor y guardo su posición.
Al final tengo el valor máximo y dónde estaba.
Complejidad: O(n) - Solo 1 recorrido lineal.
*/
btnMayor.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let mayor = vectorNumerico[0];
    let posicion = 0;
    // Recorre desde el segundo elemento comparando
    for (let i = 1; i < vectorNumerico.length; i++) {
        if (vectorNumerico[i] > mayor) {
            mayor = vectorNumerico[i];
            posicion = i;
        }
    }
    txtRespuesta.value = "Valor Maximo: " + mayor + " (posicion " + posicion + ")";
});

// ============================================
// ALGORITMO MENOR - BÚSQUEDA DE MÍNIMO
// ============================================
/*
IDEA DEL ALGORITMO MENOR:
Igual que el mayor pero al revés. Asumo que el primero es el menor.
Si encuentro uno más pequeño, lo reemplazo y guardo su posición.
Complejidad: O(n) - 1 solo recorrido.
*/
btnMenor.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
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

// ============================================
// ALGORITMO SUMA - ACUMULADOR
// ============================================
/*
IDEA DEL ALGORITMO SUMA:
Inicializo suma = 0. Recorro el vector y voy acumulando cada valor.
Fórmula: suma = suma + vector[i]
Complejidad: O(n) - 1 pasada sumando todo.
*/
btnSuma.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let suma = 0;
    for (let i = 0; i < vectorNumerico.length; i++) { suma += vectorNumerico[i]; }
    txtRespuesta.value = "Suma Total: " + suma;
});

// ============================================
// ALGORITMO PRODUCTO - MULTIPLICACIÓN ACUMULADA
// ============================================
/*
IDEA DEL ALGORITMO PRODUCTO:
Similar a la suma pero multiplicando. Inicializo producto = 1 porque 1 es el neutro de la multiplicación.
Ojo: Si el vector tiene un 0, todo el producto da 0.
Complejidad: O(n)
*/
btnProducto.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let producto = 1;
    for (let i = 0; i < vectorNumerico.length; i++) { producto *= vectorNumerico[i]; }
    txtRespuesta.value = "Producto Total: " + producto;
});

// ============================================
// ALGORITMO MEDIA - PROMEDIO ARITMÉTICO
// ============================================
/*
IDEA DEL ALGORITMO MEDIA:
Paso 1: Sumo todos los elementos con un ciclo.
Paso 2: Divido la suma total entre la cantidad de elementos N.
Fórmula: Media = Σxi / N
Representa el valor "equilibrado" del conjunto.
Complejidad: O(n)
*/
btnMedia.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let suma = 0;
    for (let i = 0; i < vectorNumerico.length; i++) { suma += vectorNumerico[i]; }
    txtRespuesta.value = "Media: " + (suma / vectorNumerico.length).toFixed(2);
});

// ============================================
// ALGORITMO MEDIANA - VALOR CENTRAL
// ============================================
/*
IDEA DEL ALGORITMO MEDIANA:
Paso 1: Copio el vector para no dañar el original.
Paso 2: Lo ordeno con Burbuja ASC porque la mediana requiere datos ordenados.
Paso 3: Si N es impar, el del medio. Si N es par, promedio de los 2 del medio.
Fórmula par: Mediana = (N/2-1 + N/2) / 2
Complejidad: O(n²) por el ordenamiento + O(1) para sacar el centro.
*/
btnMediana.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let vectorOrdenado = copiarVector(vectorNumerico);
    vectorOrdenado = ordenarBurbuja(vectorOrdenado, 'ASC');
    let mediana;
    let n = vectorOrdenado.length;
    if (n % 2 == 0) { mediana = (vectorOrdenado[n/2 - 1] + vectorOrdenado[n/2]) / 2; }
    else { mediana = vectorOrdenado[Math.floor(n/2)]; }
    txtRespuesta.value = "Mediana: " + mediana.toFixed(2);
});

// ============================================
// ALGORITMO MODA - MÁS FRECUENTE
// ============================================
/*
IDEA DEL ALGORITMO MODA:
Paso 1: Para cada elemento del vector, lo tomo como candidato.
Paso 2: Con un segundo ciclo cuento cuántas veces aparece ese candidato.
Paso 3: Guardo el que tenga más repeticiones.
Caso especial: Si todos se repiten 1 vez, no hay moda.
Complejidad: O(n²) por los 2 ciclos anidados.
*/
btnModa.addEventListener('click', function(e) {
    if (vectorNumerico.length == 0) { txtRespuesta.value = "Error: Vector vacio"; return; }
    let moda = vectorNumerico[0];
    let maxRepeticiones = 0;
    for (let i = 0; i < vectorNumerico.length; i++) {
        let repeticiones = 0;
        for (let j = 0; j < vectorNumerico.length; j++) {
            if (vectorNumerico[i] == vectorNumerico[j]) { repeticiones++; }
        }
        if (repeticiones > maxRepeticiones) {
            maxRepeticiones = repeticiones;
            moda = vectorNumerico[i];
        }
    }
    if(maxRepeticiones == 1) { txtRespuesta.value = "No hay moda"; }
    else { txtRespuesta.value = "Moda: " + moda + " se repite " + maxRepeticiones + " veces"; }
});

// ============================================
// FUNCIÓN AUXILIAR: COPIAR VECTOR
// ============================================
/*
IDEA: Crea un duplicado del arreglo para no modificar el original.
Importante para Mediana, que necesita ordenar pero sin perder el orden actual.
*/
function copiarVector(arr) {
    let nuevo = [];
    for(let i = 0; i < arr.length; i++) { nuevo[i] = arr[i]; }
    return nuevo;
}

// ============================================
// ALGORITMO BURBUJA - BUBBLE SORT
// ============================================
/*
IDEA DEL ALGORITMO BURBUJA:
Compara pares de elementos vecinos. Si están mal ordenados, los intercambia.
En cada pasada "flota" el mayor hacia el final como burbuja.
Se repite N-1 veces para asegurar orden total.
Tipo ASC: menor a mayor. Tipo DESC: mayor a menor.
Complejidad: O(n²) - Cuadrático. Bueno para aprender, lento para muchos datos.
*/
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
            }
            else {
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

// ============================================
// ALGORITMO SELECCIÓN - SELECTION SORT
// ============================================
/*
IDEA DEL ALGORITMO SELECCIÓN:
Divide el vector en 2 partes: ordenada e desordenada.
En cada vuelta busca el menor de la parte desordenada y lo pone al final de la ordenada.
"Selecciona" el mínimo de cada vuelta.
Complejidad: O(n²) pero hace menos swaps que burbuja.
*/
function ordenarSeleccion() {
    let temp = copiarVector(vectorNumerico);
    for(let i = 0; i < temp.length - 1; i++) {
        let posMin = i;
        for(let j = i + 1; j < temp.length; j++) {
            if(temp[j] < temp[posMin]) { posMin = j; }
        }
        let aux = temp[i];
        temp[i] = temp[posMin];
        temp[posMin] = aux;
    }
    vectorNumerico = temp;
    mostrarVector();
}

btnOrdenSeleccion.addEventListener('click', ordenarSeleccion);

// ============================================
// BOTÓN ORDEN BURBUJA
// ============================================
btnOrdenBurbuja.addEventListener('click', function() {
    let tipo = selectOrden.value;
    vectorNumerico = ordenarBurbuja(vectorNumerico, tipo);
    mostrarVector();
});

// ============================================
// ALGORITMO BÚSQUEDA LINEAL
// ============================================
/*
IDEA DEL ALGORITMO BÚSQUEDA LINEAL:
Recorre el vector desde el inicio hasta el final comparando 1 por 1.
Si encuentra el valor, devuelve su posición y se detiene.
Si llega al final y no lo encontró, devuelve "no encontrado".
Complejidad: O(n) en el peor caso.
*/
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