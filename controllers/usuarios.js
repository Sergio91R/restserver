const {response} = require('express');

const usuariosGet = (req, res=response) => {
    
    const {q,nombre = 'no name', apikey,page=1,limit} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usariosPut = (req, res=response) => {
    
    const { id }= req.params;
    res.json({
        msg: 'put API - UsuariosPut',
        id
    });
}

const usuariosPost = (req, res=response) => {

    const {nombre,edad} = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res=response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
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