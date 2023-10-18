const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a BD
        this.conectarDB();
        

        // Middelwares
        this.middelwares();
        
        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConection();

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
        

        
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/usuarios'));

    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log('servidor corriendo en puerto',this.port)
        })
    }
}

module.exports = Server;