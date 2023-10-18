const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario  = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response)=>{

    const { correo, password } = req.body;
    try {
        
        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // verificar si el usuario esta activo en la BD
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado - false'
            });
        }
        // verificar la contraseña
        const validPAssword = bcryptjs.compareSync( password, usuario.password);
        if ( !validPAssword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // genrar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Hable con el administrador"
        });
    }





}

module.exports = {
    login
}