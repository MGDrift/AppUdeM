const bSubmit = document.querySelector('#bSubmit')
const bRegistrar = document.querySelector('#bRegistrar')

bSubmit.addEventListener('click', () => {
    let cedula = document.querySelector('#cedula').value
    let mensaje = document.querySelector('#mensaje')
    if (cedula) {
        fetch(`http://localhost:3300/usuarios/${cedula}`) // si existe, la trae de la base de datos
            .then(response => {
                if (response.status === 200) {
                    window.localStorage.cedula = cedula
                    window.location.href = `/`
                } else {
                    mensaje.innerHTML = 'Esta cédula no existe. Regístrate!!!'
                }
            });
    } else {
        mensaje.innerHTML = 'Por favor digita tu cédula'
    }
})

bRegistrar.addEventListener('click', () => { // muestra lo visual??
    window.location.href = '/registrar.html'
})