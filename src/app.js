import  express  from "express";
import  morgan from "morgan"; // middleware de express
import { createRoles } from "./libs/initialSetup";

import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/user.routes';

const app = express(); 
createRoles(); // ejecuto la creacion de roles justo despues de la inicialización del servidor.

app.use(express.json()); // le espesifico al backend que entienda la inforamcion en json que llegan al servidor.
app.use(morgan("dev")); // cada vez que visite una direccion te muestra la peticion por consola.


app.get ( '/', (req, res) => { 
    res.json( {
        author: 'matias',
    }); 
})


app.use ('/api/products', productsRoutes); // ruta de productos.
app.use('/api/auth', authRoutes); // ruta de authentication.
app.use('/api/users', usersRoutes); // ruta de usersuarios.












export default app;