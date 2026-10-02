import "dotenv/config";
import express from "express";
import { connectToMongoDB } from "../database/mongoDb.ts";
import router from "./router.ts";

const app = express();

connectToMongoDB();

app.use(express.json());

app.use("/", router);

export const startServer = (): void => {
  const port = process.env.PORT || 4000;

  app.listen(port, () => console.log(`Server running port: ${port}`));
};

export default startServer;
