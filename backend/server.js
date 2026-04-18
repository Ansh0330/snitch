import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/config.js";

const PORT = config.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
