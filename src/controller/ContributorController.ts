import { Request, Response } from "express";
import { ContributorBusiness } from "../business/ContributorBusiness";
import { CustomError } from "../error/CustomError";
import { IContributorDTO } from "../interface/IContributor";

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
}
