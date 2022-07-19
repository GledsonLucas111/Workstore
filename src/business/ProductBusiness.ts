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
    const { name, color, size, description, price, img1, img2, img3 } = input;
    if (!name || !color || !size || !description || !price) {
      throw new CustomError(
        422,
        "Preencha os campos: 'name', 'color, 'size', 'description' e 'price' no body."
      );
    }

    const id = this.idGenerator.generateId();

    const product: Product = new Product(
      id,
      name,
      color,
      size,
      description,
      price,
      img1,
      img2,
      img3
    );

    await this.productDatabase.insert(product);
  };
  getAllProducts = async (): Promise<Product> => {
    const result: any = await this.productDatabase.getAllProducts();

    if (result.length === 0) {
      throw new CustomError(404, "Produto não encontrado");
    }
    return result;
  };
  getProductById = async (id: string): Promise<Product> => {
    const result: any = await this.productDatabase.getProductById(id);

    if (result.length === 0) {
      throw new CustomError(404, "Produto não encontrado");
    }
    return result;
  };

  deleteProduct = async (id: string): Promise<void> => {
    const idExists = await this.productDatabase.getProductById(id);

    if (!idExists) {
      throw new CustomError(404, "Produto não encontrado");
    }
    await this.productDatabase.deleteProduct(id);
  };
}
