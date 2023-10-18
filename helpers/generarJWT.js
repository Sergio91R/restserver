const jwt = require('jsonwebtoken')


const generarJWT = ( uid =  '' ) => {

    return new Promise ((resolve, rejeact)=>{

        const payload = { uid };
        jwt.sign( payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },(err, token)=> {

            if(err){
                rejeact('no se puso generar el token')
            }else{
                resolve (token);
            }
        })
    }) 
    
}

module.exports = {
    generarJWT
}