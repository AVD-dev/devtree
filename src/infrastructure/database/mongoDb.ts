import mongoose from "mongoose";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const connectionInfo = `${mongoose.connection.host}:${mongoose.connection.port} `;
    console.log(`Successfully connected to MongoDB at ${connectionInfo}`);

    return mongoose;
  } catch (err) {
    console.dir(`DEVTREE ERROR: ${err}`);
    process.exit(1);
  }
}

export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}
