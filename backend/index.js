const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const HTTP_PORT = 3010;

app.use(express.json()); // Enable JSON body parsing
app.use(cors()); // Enable CORS for API access
app.use(morgan("dev")); // Log API requests

// Import API routes
const plantRoutes = require("./routes/plants");
const treeRoutes = require("./routes/trees");
const sensorRoutes = require("./routes/sensors");
const espRoutes = require("./routes/esp");
const stateRoutes = require("./routes/state");

// Register routes
app.use("/plants", plantRoutes);
app.use("/trees", treeRoutes);
app.use("/sensors", sensorRoutes);
app.use("/esp", espRoutes);
app.use("/state", stateRoutes);

// Start the server
app.listen(HTTP_PORT, () => {
    console.log(`✅ Server running on http://localhost:${HTTP_PORT}`);
});