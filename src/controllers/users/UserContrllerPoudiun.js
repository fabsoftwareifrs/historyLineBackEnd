import User from "../../models/User.js";
export default {
  async listGlobalRank(req, res) {
    const userQuery = await User.findAll({ 
      order: [
        ['global_point', "ASC"]
      ],
        attributes: { exclude: ["password_hash", "createdAt", "updatedAt", "email"] },
      });
      res.json({
        sucesse: true,
        userQuery,
      })
  },
};
