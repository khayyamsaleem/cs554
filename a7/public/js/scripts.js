$(() => {
    const socket = io()

    socket.on('server listening', () => {
        console.log('SOCKET.IO SERVER LISTENING')
    })

    socket.on('search query', (payload) => {
        const { username, message, hits } = payload
        const urls = hits.map(hit => hit.webformatURL)
        $('#output').append($('<ul>')
                    .append(
                        $('<li>').text(`Username: ${username}`),
                        $('<li>').text(`Message: ${message}`),
                        $('<li>').text("Result:").append(
                            ...urls.map(u => `<br/><img src="${u}" width="150px" alt="${message}"/>`)
                        )
                    )
        )
    })

    $('form').submit(() => {
        socket.emit('search query', {
            username : $("input[name='username']").val(),
            query : $("input[name='query']").val(),
            message : $("input[name='message']").val()
        })
        $("input[name='username']").prop('disabled', true)
        $("input[name='query']").val('')
        $("input[name='message']").val('')
        return false
    })
})
