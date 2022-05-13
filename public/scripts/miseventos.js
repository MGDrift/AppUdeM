const eventos = document.querySelector('#eventos')

window.addEventListener('load', function() {
    let cedula = window.localStorage.cedula
    if (cedula) {
        let eventosList = '<ul class="d-grid gap-2">'
        fetch('http://localhost:3300/eventos')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                fetch('http://localhost:3300/eventosusuarios/' + cedula)
                .then(response => response.json())
                .then(body => {
                    let misEventos = body.map(evento => evento.idEvento)
                    let fechaActual = moment()
                    data = data.filter(evento => misEventos.includes(evento.id))
                    .filter((evento) => moment(evento.fecha).month() == fechaActual.month())
                    if (data.length > 0) {
                        data.forEach(function(evento) {
                            let fechaEvento = moment(evento.fecha)
                            let fechaEventoFormateada = fechaEvento.format("DD/MM/YYYY HH:mm")
                            if (fechaEvento.isSameOrBefore(fechaActual)){
                                eventosList = `
                                    ${eventosList}
                                    <li class="d-grid gap-2">
                                        <a type="button" aria-disabled class="btn btn-outline-danger btn-lg disabled">${evento.titulo} - ${fechaEventoFormateada} - No Disponible</a>
                                    </li>
                                `
                            } else {
                                eventosList = `
                                    ${eventosList}
                                    <li class="d-grid gap-2">
                                        <a type="button" class="btn btn-outline-danger btn-lg" href="javascript:registrarEvento(${evento.id})">${evento.titulo} - ${fechaEventoFormateada}</a>
                                    </li>
                                `
                            }
                            
                        })
                    
                        eventos.innerHTML = `${eventosList}</ul>`
                    } else {
                        eventos.innerHTML = '<h2 style="color: red;">No hay eventos disponibles para este mes :(</h2>'
                    }
                })
            } else {
                eventos.innerHTML = '<h2 style="color: red;">No hay eventos disponibles para este mes :(</h2>'
            }
        });
    } else {
        window.location.href = '/iniciar.html'
    }
})

function registrarEvento(id) {
    window.localStorage.idEvento = id
    window.location.href = '/registrarevento.html'
}