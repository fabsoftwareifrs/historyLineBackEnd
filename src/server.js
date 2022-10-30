const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT_SERVER = 3001;

app.listen(PORT_SERVER, () => {
  console.log(`[HTTP] Server is listen in -> http://localhost:${PORT_SERVER} `);
});
