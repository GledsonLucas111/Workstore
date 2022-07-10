import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
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
  };
}
