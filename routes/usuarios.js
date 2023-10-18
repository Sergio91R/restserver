const { Router } = require('express');
const { check } = require('express-validator')

const {validarCampos,
        validarJWT,
        esAdminRole,
        tienerole} = require('../middlewares')


const {esRolValido, emailExiste, ExisteUsuarioPorId} = require('../helpers/db-validators')

const { usuariosGet,
        usuariosPost,
        usariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');




const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id','no es un id valido').isMongoId(),
    check('id').custom(ExisteUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
],usariosPut);

router.post('/', [
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'El password es obligatorio y de mas de 6 letras').isLength({min:6}),
check('correo', 'El correo no es valido').isEmail(),
check('correo').custom(emailExiste),
//check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
check('rol').custom(esRolValido),
validarCampos
],usuariosPost);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tienerole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','no es un id valido').isMongoId(),
    check('id').custom(ExisteUsuarioPorId),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch);

module.exports = router;