const bSubmit = document.querySelector('#bSubmit')
const bRegistrar = document.querySelector('#bRegistrar')

bSubmit.addEventListener('click', () => {
    let cedula = document.querySelector('#cedula').value
    let mensaje = document.querySelector('#mensaje')
    if (cedula) {
        fetch(`http://localhost:3300/usuarios/${cedula}`)
            .then(response => {
                if (response.status === 200) {
                    window.location.href = `/?cedula=${cedula}`
                } else {
                    mensaje.innerHTML = 'Esta cédula no existe. Regístrate!!!'
                }
            });
    } else {
        mensaje.innerHTML = 'Por favor digita tu cédula'
    }
})

bRegistrar.addEventListener('click', () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let cedula = urlParams.get('cedula');
    let url = '/registrar.html'
    if (cedula) {
        url = `${url}?cedula=${cedula}`
    }
    window.location.href = url
})