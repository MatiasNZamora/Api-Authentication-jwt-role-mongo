import USER from '../models/User';
import  Jwt  from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';


export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    // *registramos el usuario.
    const newUser = new USER({
        username, 
        email,
        password: await USER.encrypt(password) 
    })
    
    if(roles) {
       const fundRoles = await Role.find({name: {$in: roles}}) // compruevo si me mando la propiedad que me mando es roles.
        newUser.roles = fundRoles.map(role => role._id); // recorre el fundrole y por cada objeto devuelve el role._id
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id] // en caso que no exista o no lo ingrese busca el rol de user y se lo asigna al newuser
    }
    
    // * guardamos el usuario.
    const savedUser = await newUser.save();
    console.log(savedUser);

    // * generamos un token para que el frontend 
    const token = Jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 // 24 hs.
    }); 
    
    // metodo que permite crear un token  esto recive 3 cosas distintas el dato a guardar, la palabra secreta y el objeto de configuración.
    // 1)_ el id que da mongoose al generar el user.
    // 2)_ secret ---> en el arch config.js ---> 'products-api'.
    // 3)_ tiempo de expiracion ! 



    res.status(200).json({token}); // devuelve un objeto token
};


export const signin = async (req, res) => {

    const userFund = await USER.findOne({email: req.body.email}).populate("roles");   // comprobamos la existencia de los datos quen nos pasa el usuario.
    //* el populate lo que haces es poblarlo. 

    if (!userFund) return res.status(400).json({message: 'User not Found'});
    
    const matchPassword = await USER.comparePassword(req.body.password, userFund.password) // recibe la contraseña guardada y la contraseña ingresada

    if(!matchPassword) return res.status(401).json({token: 'null', message: 'Invalid password'});

   const token = Jwt.sign({id: userFund.id} , config.SECRET, {
        expiresIn: 86400
    })
    // TODO: generamos un token le pasamos el objeto (ID) y le pasamos desde config el (SECRET) desde el arch config,
    // todo: por ultimo le agrego un expireIn de 24hs. Devolviendo una variable.


    res.json({token});
};


// ! ERROR LIST:
// * cuando se le asigna la encriptación a la password es una funcion asincrona en el signup. 











 