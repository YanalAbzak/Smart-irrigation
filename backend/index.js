const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const HTTP_PORT = 3004;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const esp = require("./routes/esp");
const state = require("./routes/state");
const plants = require("./routes/plants");
const threes = require("./routes/threes");

app.use("/esp", esp);
app.use("/state", state);
app.use("/plants", plants);
app.use("/threes", threes);

app.listen(HTTP_PORT, () => {
  console.log(`Server running on http://localhost:${HTTP_PORT}`);
});
