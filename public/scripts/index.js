const eventos = document.querySelector('#eventos')

window.addEventListener('load', function() {  //carga Crear evento
    let eventosList = '<ul class="d-grid gap-2">'
    fetch('http://localhost:3300/eventos')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let fechaActual = moment()
                data.filter((evento) => moment(evento.fecha).month() == fechaActual.month())
                .forEach((evento) => {
                    let fechaEvento = moment(evento.fecha)
                    let fechaEventoFormateada = fechaEvento.format("DD/MM/YYYY HH:mm")
                    if (fechaEvento.isSameOrBefore(fechaActual)){ //verifica el mes para saber si deshabilita el evento
                        eventosList = `
                            ${eventosList}
                            <li class="d-grid gap-2">
                                <a type="button" aria-disabled class="btn btn-outline-danger btn-lg disabled">${evento.titulo} - ${fechaEventoFormateada} - No Disponible</a>
                            </li>
                        `
                    } else { // deja el evento habilitado, con la posibilidad de guardar el metodo
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
        });
})

function registrarEvento(id) { // direcion url de crear evento
    window.localStorage.idEvento = id
    window.location.href = '/registrarevento.html'
}