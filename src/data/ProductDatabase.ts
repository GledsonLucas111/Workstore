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
        })
        .into(ProductDataBase.TABLE_NAME);
    } catch (e: any) {
      throw new Error(e.sqlMessage || e.message);
    }
    await BaseDatabase.destroyConnection();
  };
}
