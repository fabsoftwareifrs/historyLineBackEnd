import Sequelize from "sequelize";
import dbConfig from "../config/database.js";
import User from "../models/User.js";

const connect = new Sequelize(dbConfig);
User.init(connect);
export default connect;
