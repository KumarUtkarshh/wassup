import { createServer } from "http";
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import { initializeSocket } from "./src/utils/socket.js";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

initializeSocket(httpServer);

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
