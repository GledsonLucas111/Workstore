import { ProductDataBase } from "../data/ProductDatabase";
import { CustomError } from "../error/CustomError";
import { IProductDTO } from "../interface/IProduct";
import { Product } from "../model/Product";
import { IdGenerator } from "../services/IdGenerator";

export class ProductBusiness {
  constructor(
    private productDatabase: ProductDataBase,
    private idGenerator: IdGenerator
  ) {}
  registerProduct = async (input: IProductDTO) => {
    const { name, color, size, description, price } = input;
    if (!name || !color || !size || !description || !price) {
      throw new CustomError(
        422,
        "Preencha os campos: 'name', 'color, 'size', 'description', 'price' no body."
      );
    }

    const id = this.idGenerator.generateId();

    const product: Product = new Product(
      id,
      name,
      color,
      size,
      description,
      price
    );

    await this.productDatabase.insert(product);
  };
}
