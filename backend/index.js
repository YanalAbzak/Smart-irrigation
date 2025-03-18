const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config(); // Load environment variables

const app = express();
const HTTP_PORT = process.env.PORT || 3010;

app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(morgan("dev")); // Log API requests

// Import routes
const plantRoutes = require("./routes/plants");
const treeRoutes = require("./routes/trees");
const sensorRoutes = require("./routes/sensors");
const espRoutes = require("./routes/esp");
const stateRoutes = require("./routes/state");

// Define API routes
app.use("/plants", plantRoutes);
app.use("/trees", treeRoutes);
app.use("/sensors", sensorRoutes);
app.use("/esp", espRoutes);
app.use("/state", stateRoutes);

// Sync database and start the server
sequelize.sync({ alter: true }) // Ensures database tables are up-to-date
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`✅ Server running on http://localhost:${HTTP_PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Failed to sync database:", error);
    });
