import app from "./src/app";
import { connectDB } from "./src/config/database";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`hello http://localhost:${PORT}`);
  });
});
