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
    if (email.indexOf("@") === -1) {
      throw new CustomError(400, "Email invalido.");
    }

    if (!name || !email || !password) {
      throw new CustomError(
        422,
        "Preencha os campos: 'name', 'email' e 'password' no body."
      );
    }
    if (password.length < 8) {
      throw new CustomError(401, "Senha deve ter no mínimo 8 caractéries");
    }

    const isVerifyExistUser  = await this.contributorDatabase.getContributorByEmail(
      email
    );
    if (isVerifyExistUser) {
      throw new CustomError(400, "Este email já está cadastrado.");
    }
    
    const id = this.idGenerator.generateId();


    const hashPassword = await this.hashManager.hash(password);

    const contributor: Contributor = new Contributor(
      id,
      name,
      email,
      hashPassword
    );

    await this.contributorDatabase.insert(contributor);

    const accessToken = this.authenticator.generateToken({ id });

    return accessToken;
  };
  login = async (input: { email: string; password: string }) => {
    const { email, password } = input;
    if (!email || !password) {
      throw new CustomError(
        422,
        "Preencha os campos: 'email' e 'password' no body."
      );
    }
    const findContributorByEmail =
      await this.contributorDatabase.getContributorByEmail(email);

    if (!findContributorByEmail) {
      throw new CustomError(400, "Este email não está cadastrado.");
    }
    const hashCompare = await this.hashManager.compare(
      password,
      findContributorByEmail.password
    );
    if (!hashCompare) {
      throw new CustomError(409, "Senha incorreta.");
    }

    const loginToken = this.authenticator.generateToken({
      id: findContributorByEmail.id,
    });

    return loginToken;
  };
}
