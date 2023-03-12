

const socket = io()

socket.on('mensaje_individual',(data) => 
console.log('mensaje del servidor:', data) )  //actualizar con boton y array

