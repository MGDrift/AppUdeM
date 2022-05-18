let cedula = window.localStorage.cedula;

window.addEventListener('load', function() {//carga la pagina
    if (cedula) {// muestra el nombre en la barra de navegacion 
        let nombreP = document.querySelector('#nombreP')
        fetch(`http://localhost:3300/usuarios/${cedula}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.data)
                nombreP.innerHTML = `${data.data[0].nombre} ${data.data[0].apellido}`
            });
    }
});

function home() {
    window.location.href = '/'
}

function iniciar() {
    window.location.href = '/iniciar.html'
}

function misEventos() {
    window.location.href = '/miseventos.html'
}

function crearEvento() {
    window.location.href = '/crearevento.html'
}