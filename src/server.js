import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import passport from "passport";
import "./config/database.js";
import "./database/connect.js";
import "./config/passaport.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use("/api", routes);

const PORT_SERVER = process.env.PORT_SERVER || 3000;

app.listen(PORT_SERVER, () => {
  console.log(`[HTTP] Server is listen in -> http://localhost:${PORT_SERVER} `);
});
