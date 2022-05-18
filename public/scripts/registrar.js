const bSubmit = document.querySelector('#bSubmit')
const mensaje = document.querySelector('#mensaje')

bSubmit.addEventListener('click', () => {
    const data = {
        cedula: document.querySelector('#cedula').value,
        nombre: document.querySelector('#nombre').value,
        apellido: document.querySelector('#apellido').value,
        ramaInstitucional: document.querySelector('#ramaInstitucional').value
    }

    if (!data.cedula) {
        mensaje.innerHTML = "Porfavor ingresa tu cédula";
    } else if (!data.nombre) {
        mensaje.innerHTML = "Porfavor ingresa tu nombre";
    } else if (!data.apellido) {
        mensaje.innerHTML = "Porfavor ingresa tu apellido";
    } else if (!data.ramaInstitucional) {
        mensaje.innerHTML = "Porfavor ingresa tu rama institucional";
    } else {
        fetch('http://localhost:3300/usuarios', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const mensaje = document.querySelector('#mensaje')
            mensaje.innerHTML = `<p>${data.mensaje}</p>`
        })
        .catch(err => console.log(err)) 
    }

})

const campoNumerico = document.getElementById('cedula');

campoNumerico.addEventListener('keydown', function(evento) {
  const teclaPresionada = evento.key;
  const teclaPresionadaEsUnNumero =
    Number.isInteger(parseInt(teclaPresionada));

  const sePresionoUnaTeclaNoAdmitida = 
    teclaPresionada != 'ArrowDown' &&
    teclaPresionada != 'ArrowUp' &&
    teclaPresionada != 'ArrowLeft' &&
    teclaPresionada != 'ArrowRight' &&
    teclaPresionada != 'Backspace' &&
    teclaPresionada != 'Delete' &&
    teclaPresionada != 'Enter' &&
    !teclaPresionadaEsUnNumero;
  const comienzaPorCero = 
    campoNumerico.value.length === 0 &&
    teclaPresionada == 0;

  if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
    evento.preventDefault(); 
  }

});