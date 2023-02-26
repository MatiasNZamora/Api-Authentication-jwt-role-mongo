import { Router } from "express";
const router  = Router();

import * as productsCrl from "../controllers/products.controllers";
// llamo a todas las funciones y las invoco en las rutas.

import { authJwt } from "../middlewares";
// importamos el middleware 


router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCrl.creeateProducts); // compruebo que tenga un token y que sea un moderador.

router.get('/', productsCrl.getProducts);

router.get('/:productId', productsCrl.getProductsById);

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCrl.updateProductsbyId);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCrl.deleteProductById);




export default router;