const bSubmit = document.querySelector('#bSubmit')

bSubmit.addEventListener('click', () => {

    const data = {
        cedula: document.querySelector('#cedula').value,
        nombre: document.querySelector('#nombre').value,
        apellido: document.querySelector('#apellido').value,
        ramaInstitucional: document.querySelector('#ramaInstitucional').value
    }

    console.log(data)

    fetch('http://localhost:3300/usuarios', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const mensaje = document.querySelector('#mensaje')
        mensaje.innerHTML = `<p>${data.mensaje}</p>`
        if (data.data) {
            console.log(data.data)
        }
    })
    .catch(err => console.log(err)) 
})