$(() => {
    const socket = io()

    socket.on('server listening', () => {
        console.log('SOCKET.IO SERVER LISTENING')
    })

    socket.on('search query', (payload) => {
        const { username, message, image_url } = payload
        $('#output').append($('<ul>')
                    .append(
                        $('<li>').text(`Username: ${username}`),
                        $('<li>').text(`Message: ${message}`),
                        $('<li>').text("Result:").append(`<br/><img src="${image_url}" width="150px"/>`)
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
