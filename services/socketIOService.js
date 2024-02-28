const socketIO = require('socket.io');
const http = require('http');

module.exports = (server) => {
    return {
        initIoSocket : function (){
            try{
                const io = socketIO(server, {
                    allowEIO3: true,
                    cors: {
                        origin: process.env._HOST_FRONT,
                        credentials: true
                    }
                });

                return io.on('connection', (socket) => {
                    return socket;
                });
            }
            catch(err){
                console.log(err);
                throw err;
            }
                        
        }
    }
}



