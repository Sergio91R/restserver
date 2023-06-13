const { Router } = require('express');
const { usuariosGet,
        usuariosPost,
        usariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usariosPut);

router.post('/', usuariosPost);

router.delete('/',usuariosDelete );

router.patch('/', usuariosPatch);

module.exports = router;