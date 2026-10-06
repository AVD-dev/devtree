import "dotenv/config";
import express from "express";
import { composeAccountsRouter } from "../composition/accounts.composition.ts";
import { connectToMongoDB } from "../database/mongoDb.ts";

const app = express();

app.use(express.json());

app.use("/", composeAccountsRouter());

export const startServer = async (): Promise<void> => {
  const port = process.env.PORT || 4000;

  await connectToMongoDB();

  app.listen(port, () => console.log(`Server running port: ${port}`));
};

export default startServer;
