import  jwt  from "jsonwebtoken";
import config from "../config";

import USER from "../models/User";
import Role from "../models/Role";


// verifica si estamos mandando un token (middleware de express)
export const verifyToken = async (req, res, next) => {
   
    try {
        const token = req.headers["x-access-token"]; // espero por un header y guardo la propiedad (x-access-token)
        console.log(token)
        // ---> recibimos un token.

        // verifica si estamos recibiendo la cabecera 
        if (!token) return res.status(403).json({ message: "No token provided"}); // ---> comprobamos si el token existe 

        // extraigo el id que le dimos al momneto de crearlo en el -> auth.controller
        const decoded = jwt.verify(token, config.SECRET) // ---> si existe extraemos lo que hay dentr del token.

        req.userId = decoded.id;

        const user = await USER.findById(req.userId, {password: 0}) // ---> buscamos al usuario en funcion del objeto retorando en el decoded.
        if(!user) return res.status(404).json({message: 'no user found'}) // ----> si el usuario no existe retorna 404.

        next(); 

   } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
   }
}; 

export const isModerator = async (req, res, next) => { 
     const user =  await USER.findById(req.userId); // tenemos los usuarios
     const roles = await Role.find({_id: {$in: user.roles}})     // comprobamos los roles

     for(let i = 0; i < roles.length; i++) {
          if(roles[i].name === "moderator") {
               next();
               return
          }
     }
     // validamos el rol o nivel del usuario recorriendo el arreglo 

     return res.status(403).json({message: "Require Moderator role"});
}

export const isAdmin = async (req, res, next) => { 
     const user =  await USER.findById(req.userId); // tenemos los usuarios
     const roles = await Role.find({_id: {$in: user.roles}})     // comprobamos los roles

     for(let i = 0; i < roles.length; i++) {
          if(roles[i].name === "admin") {
               next();
               return;
          }
     }
     
     return res.status(403).json({message: "Require Administrator role"});
}
 

// todo: validacion de token para protejer las rutas.
// todo: todas las funciones posteriores a verifyToken tienen acceso a traves del (req) al id del usuario (userId).