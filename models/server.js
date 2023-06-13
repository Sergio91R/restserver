const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        // Middelwares
        this.middelwares();
        // Rutas de mi aplicacion
        this.routes();
    }

    middelwares(){

        //Cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
       
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log('servidor corriendo en puerto',this.port)
        })
    }
}

module.exports = Server;
