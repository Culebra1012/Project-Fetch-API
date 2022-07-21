const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e){
    e.preventDefault();


    //Validar 
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if(ciudad === '' || pais === ''){

        //Error
        mostrarError('Ambos campos son obligatorios')

        return;
    }

    //Consultar la API a la que nos conectamos 
    consultarAPI(ciudad, pais)
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100')

    if(!alerta) {
                //Crear una alerta
        const alerta = document.createElement('div')

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
        'max-w-md', 'mx-auto', 'mt-6', 'text-center')

        alerta.innerHTML = `
            <strong class="font-blod">Error</strong>
            <span class="block">${mensaje}</span>
        `
            container.appendChild(alerta)   
        //Eliminar alerta en un tiempo de 5 seg
        setTimeout(() => {
            alerta.remove();
        }, 5000);
            
    }
}

function consultarAPI(ciudad, pais){

    const appId = 'e6a7a14e15b762f6454adf61e3d65a4a'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        Spinner(); //Muestra el spinner de carga 

    fetch(url)
        .then( respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML() //Limpiar el HTML
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada')
                return;
            }
            //Imprime la respuesta en el HTML
            mostrarClima(datos)
        })
}

function mostrarClima(datos){
    const {name,  main: { temp, temp_max, temp_min} } = datos
    const centigrados = kelvinACentigrados(temp)
    const max = kelvinACentigrados(temp_max)
    const min = kelvinACentigrados(temp_min)
    
    //nNombre de la ciudad
    const nombreCiudad = document.createElement('p')
    nombreCiudad.innerHTML = `Clima en ${name}`
    nombreCiudad.classList.add('font-bold', 'text-4xl')

    //Temp acutal
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl')

    //Temp min
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Temperatura maxima: ${max} &#8451;`
    tempMaxima.classList.add('text-xl')

    //Tempminima

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Temperatura minima: ${min} &#8451;`
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMaxima)
    resultadoDiv.appendChild(tempMinima)

    resultado.appendChild(resultadoDiv);
}
function kelvinACentigrados(grados){
    return parseInt(grados -273.15);
}

function limpiarHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner() {
        limpiarHTML()
        const divSpiner = document.createElement('div')
    divSpiner.classList.add('spinner');

    divSpiner.innerHTML = `
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
    `;
    resultado.appendChild(divSpiner)
}