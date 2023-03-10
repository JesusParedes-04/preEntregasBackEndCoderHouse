const socket = io()

socket.emit('mensaje individual', 'mensaje que se devuelve al cliente conectado')  //actualizar con boton y array
