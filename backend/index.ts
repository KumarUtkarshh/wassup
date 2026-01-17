import { createServer } from "http";
import app from "./src/app";
import { connectDB } from "./src/config/database";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`hello http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server: ", error);
    process.exit(1);
  });
