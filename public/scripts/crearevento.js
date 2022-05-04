const bSubmit = document.querySelector('#bSubmit')
const mensaje = document.querySelector('#mensaje')

bSubmit.addEventListener('click', () => {
    const data = {
        titulo: document.querySelector('#titulo').value,
        fecha: document.querySelector('#fecha').value,
        lugar: document.querySelector('#lugar').value,
        descripcion: document.querySelector('#descripcion').value
    }

    console.log(data)

    if (!data.titulo) {
        mensaje.innerHTML = "Porfavor ingresa el titulo";
    } else if (!data.fecha) {
        mensaje.innerHTML = "Porfavor ingresa la fecha";
    } else if (!data.lugar) {
        mensaje.innerHTML = "Porfavor ingresa el lugar";
    } else {
        fetch('http://localhost:3300/eventos', {
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
        })
        .catch(err => console.log(err)) 
    }
})