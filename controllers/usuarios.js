const {response} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario')

const usuariosGet = async (req, res=response) => {
    

   const { limite = 5, desde = 0} = req.query;
   const query = {estado: true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usariosPut = async (req, res=response) => {
    
    const { id }= req.params;
    const { __id,password, google, correo, ...resto} = req.body;

    //TODO validar contra BD
    if (password){
        //encriptar la contraseña 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto );

    res.json(usuario);
}

const usuariosPost = async (req, res=response) => {

    const { nombre,correo,password,rol } = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

   

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    const usuarioAutenticado = req.usuario;

    res.json({usuario,usuarioAutenticado});
}

const usuariosPatch = (req, res=response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}



module.exports = {
    usuariosGet,
    usariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}