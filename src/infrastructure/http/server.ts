import "dotenv/config";
import express from "express";
import { connectToMongoDB } from "../database/mongoDb.ts";
import router from "./router.ts";

const app = express();

app.use(express.json());

app.use("/", router);

export const startServer = async (): Promise<void> => {
  const port = process.env.PORT || 4000;

  await connectToMongoDB();

  app.listen(port, () => console.log(`Server running port: ${port}`));
};

export default startServer;
