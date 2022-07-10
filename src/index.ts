import dotenv from "dotenv";
import { AddressInfo } from "net";
import express, {Express} from "express";
import cors from 'cors'
import { productRouter } from "./router/productRouter";
import { contributorRouter } from "./router/contributorRouter";


dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/product", productRouter);
app.use("/contributor", contributorRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
