import { ContributorDatabase } from "../data/ContributorDatabase";
import { CustomError } from "../error/CustomError";
import { IContributorDTO } from "../interface/IContributor";
import { Contributor } from "../model/Contributor";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class ContributorBusiness {
  constructor(
    private contributorDatabase: ContributorDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}
  registerContributor = async (input: IContributorDTO) => {
    const { name, email, password } = input;

    if(email.indexOf("@") === -1){
        throw new Error("Email invalido.")
    }

    if (!name || !email || !password) {
      throw new CustomError(
        422,
        "Preencha os campos: 'name', 'email, 'password' no body."
      );
    }

    const id = this.idGenerator.generateId();

    const hasPassword = await this.hashManager.hash(password);

    const contributor: Contributor = new Contributor(
      id,
      name,
      email,
      hasPassword
    );

    await this.contributorDatabase.insert(contributor);

    const accessToken = this.authenticator.generateToken({id})

    return accessToken;
  };
}
