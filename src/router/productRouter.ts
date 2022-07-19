import express from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductController } from "../controller/ProductController";
import { ProductDataBase } from "../data/ProductDatabase";
import { IdGenerator } from "../services/IdGenerator";

export const productRouter = express.Router();

const projectBusiness = new ProductBusiness(
    new ProductDataBase(),
    new IdGenerator()
);

const projectController = new ProductController(projectBusiness);

productRouter.post('/product', projectController.registerProduct);
productRouter.get('/product', projectController.getAllProducts);
productRouter.get('/product/:id', projectController.getProductById);
productRouter.delete('/product/:id', projectController.deleteProduct);


