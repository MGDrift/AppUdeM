const eventoDiv = document.querySelector('#evento')

window.addEventListener('load', function() {
    let id = window.localStorage.idEvento
    let cedula = window.localStorage.cedula
    if (id) {
        fetch('http://localhost:3300/eventos/' + id)
        .then(response => response.json())
        .then(body => {
            let evento = body.data[0];
            fetch(`http://localhost:3300/eventosusuarios/${id}/${cedula}`)
            .then(response => response.status)
            .then(status => {
                let estaRegistrado = status == 200;
                eventoDiv.innerHTML = `
                    <h2>${evento.titulo}</h2>
                    <br/>
                    <p>${moment(evento.fecha).format("DD/MM/YYYY HH:mm")}</p>
                    <br/>
                    <p>Lugar: ${evento.lugar}</p>
                    <br/>
                    <p>${evento.descripcion}</p>
                    <br/>
                    <div>
                        <a id="registrarBoton" type="button" class="btn btn-outline-primary btn-lg" href="javascript:registrar(${id}, ${cedula}, ${estaRegistrado})">${
                            estaRegistrado ? 'Quitar Registro' : 'Registrar'}</a>
                        <a type="button" class="btn btn-outline-danger btn-lg" href="/">Cancelar</a>
                    </div>
                    <br/>
                    <div id="mensaje"></div>
                    <br/>
                    <div id="contenedorQR" style="display: flex; justify-content: center;"></div>
                `
            })
        })
    } else {
        window.location.href = '/'
    }
})

window.addEventListener("beforeunload", function(e){
   window.localStorage.removeItem('idEvento')
}, false);

function registrar(idEvento, cedula, estaRegistrado) {
    if (estaRegistrado) {
        fetch(`http://localhost:3300/eventosusuarios/${idEvento}/${cedula}`, { method: 'DELETE' })
        .then(res => window.location.href = "/miseventos.html")
        .catch(err => console.log(err))
    } else {
        const data = {
            idEvento: idEvento,
            cedula: cedula
        }
        fetch('http://localhost:3300/eventosusuarios', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                const contenedorQR = document.getElementById('contenedorQR');
                const mensaje = document.getElementById('mensaje');
                const QR = new QRCode(contenedorQR);
                QR.makeCode("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
                mensaje.innerHTML = '<h2>Registrado exitosamente :D</h2>'
            })
            .catch(err => console.log(err))
    }
    const registrarBoton = document.querySelector('#registrarBoton')
    registrarBoton.outerHTML = `<a type="button" class="btn btn-outline-primary btn-lg" href="javascript:registrar(${idEvento}, ${cedula}, ${!estaRegistrado})">${
        !estaRegistrado ? 'Quitar Registro' : 'Registrar'}</a>`
}