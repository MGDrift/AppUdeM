function home() {
    let nombreA = document.querySelector('#nombreA')
    console.log(window.nombre)
    if (window.nombre !== null || window.nombre !== "" || window.nombre !== undefined) {
        nombreA.innerHTML = `<span class="navbar-text">${window.nombre}</span>`
    } else {
        nombreA.innerHTML = `<span class="navbar-text">Ingresa tu cédula</span>`
    }
    window.location.href = '/'
}

function iniciar() {
    let nombreA = document.querySelector('#nombreA')
    console.log(window.nombre)
    if (window.nombre !== null || window.nombre !== "" || window.nombre !== undefined) {
        nombreA.innerHTML = `<span class="navbar-text">${window.nombre}</span>`
    } else {
        nombreA.innerHTML = `<span class="navbar-text">Ingresa tu cédula</span>`
    }
    window.location.href = '/iniciar.html'
}