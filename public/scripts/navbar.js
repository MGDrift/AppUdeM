let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let cedula = urlParams.get('cedula');

window.addEventListener('load', function() {
    if (cedula) {
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
    let url = '/'
    if (cedula)
        url = `${url}?cedula=${cedula}`
    window.location.href = url
}

function iniciar() {
    let url = '/iniciar.html'
    if (cedula)
        url = `${url}?cedula=${cedula}`
    window.location.href = url
}

function misEventos() {
    let url = '/miseventos.html'
    if (cedula)
        url = `${url}?cedula=${cedula}`
    window.location.href = url
}

function crearEvento() {
    let url = '/crearevento.html'
    if (cedula)
        url = `${url}?cedula=${cedula}`
    window.location.href = url
}