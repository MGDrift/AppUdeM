const eventos = document.querySelector('#eventos')

window.addEventListener('load', function() {
    let eventosList = '<ul class="d-grid gap-2">'
    fetch('http://localhost:3300/eventos')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(function(evento) {
                    let fecha = moment(evento.fecha).format("DD/MM/YYYY HH:mm")
                    eventosList = `
                        ${eventosList}
                        <li class="d-grid gap-2">
                            <button type="button" class="btn btn-outline-danger btn-lg">${evento.titulo} - ${fecha}</button>
                        </li>
                    `
                })
                eventos.innerHTML = `${eventosList}</ul>`
            } else {
                eventos.innerHTML = '<h2 style="color: red;">No hay eventos disponibles para este mes :(</h2>'
            }
        });
})