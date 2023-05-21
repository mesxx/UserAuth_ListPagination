const jwt = require("jsonwebtoken");

const { User } = require("../models");

exports.auth = async (req, _, next) => {
  try {
    let token;
    if (req.headers.authorization.split(" ")[0] === "Bearer") {
      const authHeader = req.header("Authorization");
      token = authHeader && authHeader.split(" ")[1];
    }
    if (!token) throw { message: "No Access" };
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if ((await User.findById(verified.id)) === null) {
      throw { message: "No Access" };
    } else {
      req.user = await User.findById(verified.id);
    }
    next();
  } catch (error) {
    next(error);
  }
};
