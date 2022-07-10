import { Contributor } from "../model/Contributor";
import { BaseDatabase } from "./BaseDatabase";

export class ContributorDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "Contributor";
  public insert = async (contributor: Contributor) => {
    try {
      await this.getConnection()
        .insert({
          id: contributor.getId(),
          name: contributor.getName(),
          email: contributor.getEmail(),
          password: contributor.getPassword()
        })
        .into(ContributorDatabase.TABLE_NAME);
        
    } catch (e: any) {
      throw new Error(e.sqlMessage || e.message);
    }
    await BaseDatabase.destroyConnection();
  };
}