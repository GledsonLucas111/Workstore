import { Request, Response } from "express";
import { ContributorBusiness } from "../business/ContributorBusiness";
import { CustomError } from "../error/CustomError";
import { IContributorDTO } from "../interface/IContributor";
import { BaseDatabase } from "../data/BaseDatabase";

export class ContributorController {
  constructor(private contributorBusiness: ContributorBusiness) {}
  registerContributor = async (req: Request, res: Response) => {
    try {
      const input: IContributorDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      const result = await this.contributorBusiness.registerContributor(input);

      res.status(201).send({ token: result });
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.statusCode).send(e.message);
      } else if (e instanceof Error) {
        res.status(400).send(e.message);
      }
    }

  };
  login = async (req: Request, res: Response) => {
    try {
      const input: { email: string; password: string } = {
        email: req.body.email,
        password: req.body.password,
      };
      const result = await this.contributorBusiness.login(input);
      res.status(200).send({ token: result });
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
