import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import client from "./config/db";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await client.connect();

    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);

    process.exit(1);
  }
}

startServer();