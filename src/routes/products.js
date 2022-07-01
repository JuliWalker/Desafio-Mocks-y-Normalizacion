import {Router} from 'express'
import { productsDao as api } from '../daos/index.js'
import { faker } from '@faker-js/faker/locale/es';

const router = Router()

router.get('/test', async (req,res)=>{
    try {
        let array = []
        for (let i=0; i < 5 ; i++ ) {
        let obj = {
            id: faker.random.alphaNumeric(8),
            nombre: faker.commerce.productName(),
            descripcion: faker.commerce.productDescription(),
            codigo: faker.random.alphaNumeric(8),
            thumbnail: faker.image.image(400, 400),
            precio: faker.commerce.price(500, 5000),
            stock: faker.random.numeric(2)
        }
        array.push(obj)
        }
        res.json(array)
    } catch (error) {
        res.json({message: err.message});
    }
});

router.get('/', async (req,res)=>{
    try {
        const allProducts = await api.getAll()
        res.json(allProducts)
    } catch (error) {
        console.log(error)
    }    
});

router.get('/:id', async (req, res) => {
    try{
        const producto = await api.getOne(req.params.id);
        producto? res.status(200).json(producto) : res.status(404).json({message: 'Producto no encontrado. id: ' + req.params.id});
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

router.post('/', async (req,res)=>{
    try {
        const obj = req.body
        const createProduct = await api.saveNew(obj)
        res.json(createProduct)
    } catch (error) {
        res.json({message: err.message});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const productoActualizado = await api.update(req.params.id, req.body);
        res.json({
            message: 'Producto actualizado correctamente',
            id: productoActualizado._id
            });
    }catch (err){
        res.json({message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const productoBorrado = await api.delete(req.params.id);
        res.json({
            message: 'Producto borrado correctamente',
            id: productoBorrado._id
            });
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

export default router