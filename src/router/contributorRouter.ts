import express from "express";
import { ContributorBusiness } from "../business/ContributorBusiness";
import { ContributorController } from "../controller/ContributorController";
import { ContributorDatabase } from "../data/ContributorDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const contributorRouter = express.Router();

const contributorBusiness = new ContributorBusiness(
    new ContributorDatabase(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
);

const contributorController = new ContributorController(contributorBusiness);

contributorRouter.post('/signup', contributorController.registerContributor);
contributorRouter.post('/login', contributorController.login);

