import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = new Schema ({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId // espesifico que el tipo de relacion o referencia es un objeto del schema Role
    }]
}, {
    timestamps: true,
    versionKey: false
   }
);

// metodo para cifrar como para comprar  la contraseña 

// * metodo que recibe la contraseña y la cifra 
userSchema.statics.encrypt = async (password) => { // usuario te da una contraseña
   const salt = await bcrypt.genSalt(10); // aplica un algoritmo y se setea cuantas veces van a aplicar el algoritmo
   return await bcrypt.hash(password, salt); // creo un hash o contraseña cifrada con el metodo creado y la contraseña ingresada por el usuario

};


// * metodo que compara la contraseña ingresada con la de la base de datos.
// * password (la que esta en la DB) recivePassword (la que ingresa el usuario que intenta comparar).
userSchema.statics.comparePassword = async (password, recivePassword) => {
    return await bcrypt.compare(password, recivePassword); // compara las password y retorna un true o false.
}; 



export default model("USER", userSchema);