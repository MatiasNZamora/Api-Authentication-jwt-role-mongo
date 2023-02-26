 import Role from '../models/Role'; 

export const createRoles = async () => { 

    const count = await Role.estimatedDocumentCount() // busca si en el modelo rol cuenta si existe algun documento

    try {
        
        if (count > 0)  return; // si es mayor a 0 existen roles y solo retorna

        const values = await Promise.all ([ 
            new Role({name:'user'}).save(),
            new Role({name:'moderator'}).save(),
            new Role({name:'admin'}).save()
        ])

        console.log(values);

    } catch (error) {
        console.error(error);        
    }
}; 

//TODO: Promise.all ejecuta todas las funciones espesificadas al mismo tiempo para ganar rendimiento.