import Product from "../models/Products";


export const creeateProducts = async (req, res) => {
    
    const {name, catergory, price, imgURL} = req.body; // esto es el destructuring para utilizarlo.

    const newProduct = new Product({ name, catergory, price, imgURL });

    const productSaved = await newProduct.save(); // se guarda el producto y se le pone await dado que va a tomar tiempo

    res.status(201).json(productSaved); // espesificamos codigo de estado.
};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products); 
} // funcion que me filtra y muestra todo los productos.

export const getProductsById = async (req, res) => {
    const product = await Product.findById(req.params.productId); // la peticion sale pero me devuelve valor null
    // console.log(product); 
    res.status(200).json(product)
}

export const updateProductsbyId = async (req, res) => { // me pasa los datos del producto que se actualizo
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true // aqui devuelve el producto nuevo o actualizado.
    }) 
    console.log(updateProduct);
    res.status(200).json(updateProduct);
}

export const  deleteProductById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json();
}

// ! ERROR LIST:
// * MI ERROR FUE QUE ( productId ) ES EL PARAMETRO QUE ESTA DEFINIDO EN product.routes.js y en ese archivo no estaba bien escrito.