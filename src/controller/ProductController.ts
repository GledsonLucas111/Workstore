import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { CustomError } from "../error/CustomError";
import { IProductDTO } from "../interface/IProduct";

export class ProductController {
  constructor(private productBusiness: ProductBusiness) {}
  registerProduct = async (req: Request, res: Response) => {
    try {
      const input: IProductDTO = {
        name: req.body.name,
        color: req.body.color,
        size: req.body.size,
        description: req.body.description,
        price: req.body.price,
        img1: req.body.img1,
        img2: req.body.img2,
        img3: req.body.img3,
      };
      await this.productBusiness.registerProduct(input);
      res.status(201).send({ message: "Cadastrado com sucesso!" });
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.statusCode).send(e.message);
      } else if (e instanceof Error) {
        res.status(400).send(e.message);
      }
    }
    await BaseDatabase.destroyConnection();
  };
  getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await this.productBusiness.getAllProducts();

      res.status(200).send({ products: result });
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.statusCode).send(e.message);
      } else if (e instanceof Error) {
        res.status(400).send(e.message);
      }
    }
    await BaseDatabase.destroyConnection();
  };
  getProductById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const result = await this.productBusiness.getProductById(id);

      res.status(200).send({ product: result });
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.statusCode).send(e.message);
      } else if (e instanceof Error) {
        res.status(400).send(e.message);
      }
    }
    await BaseDatabase.destroyConnection();
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await this.productBusiness.deleteProduct(id);

      res.status(200).send({ message: "Produto deletado com sucesso!" });
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.statusCode).send(e.message);
      } else if (e instanceof Error) {
        res.status(400).send(e.message);
      }
    }
    await BaseDatabase.destroyConnection();
  };
}
