import { Product } from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDataBase extends BaseDatabase {
  private static TABLE_NAME: string = "Products";
  public insert = async (product: Product) => {
    try {
      await this.getConnection()
        .insert({
          id: product.getId(),
          name: product.getName(),
          color: product.getColor(),
          size: product.getSize(),
          description: product.getDescription(),
          price: product.getPrice(),
          img1: product.getImg1(),
          img2: product.getImg2(),
          img3: product.getImg3(),
        })
        .into(ProductDataBase.TABLE_NAME);
    } catch (e: any) {
      throw new Error(e.sqlMessage || e.message);
    }
    await BaseDatabase.destroyConnection();
  };
  public getAllProducts = async (): Promise<Product> => {
    try {
      const result: Product = await this.getConnection().into(
        ProductDataBase.TABLE_NAME
      );

      return Product.toProductModel(result);
    } catch (e: any) {
      throw new Error(e.sqlMessage || e.message);
    }
  };
  public getProductById = async (id: string): Promise<Product>  => {
    try {
      const result: Product = await this.getConnection()
      .where(id)
      .into(ProductDataBase.TABLE_NAME);
      
      return Product.toProductModel(result);
    } catch (e: any) {
      throw new Error(e.sqlMessage || e.message);
    }
  };
  public deleteProduct = async (id: string): Promise<void>  => {
    try {
      await this.getConnection()
        .delete()
        .where({id})
        .into(ProductDataBase.TABLE_NAME);
    } catch (e: any) {
      throw new Error(e.sqlMessage || e.message);
    }
  };
}
