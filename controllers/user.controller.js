const bcrypt = require("bcrypt");
const Joi = require("joi");

const { User } = require("../models");
const { Jwt } = require("../helpers");

class UsersController {
  static register = async (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().min(2).required(),
      password: Joi.string().min(5).required(),
      fullName: Joi.string().min(2).required(),
    });
    const { error } = schema.validate(req.body);
    const { username, password, fullName } = req.body;
    try {
      if (error) throw { message: error.message };
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const data = await User.create({
        username,
        password: hashedPassword,
        fullName,
      });

      const token = Jwt.sign({ id: data._id });

      res.status(201).json({
        code: 201,
        message: "Success",
        data: { ...data._doc, token },
      });
    } catch (error) {
      next(error);
    }
  };

  static access = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const userExist = await User.findOne({ username });
      if (!userExist) throw { message: "validation failed" };

      const isValid = await bcrypt.compare(password, userExist.password);
      if (!isValid) throw { message: "validation failed" };

      const token = Jwt.sign({ id: userExist._id });

      res.status(200).json({
        code: 200,
        message: "Success",
        data: { ...userExist._doc, token },
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllUser = async (req, res, next) => {
    const { limit, page } = req.query;
    try {
      const data = await User.find()
        .limit(limit)
        .skip(limit * page);

      res.status(200).json({
        code: 200,
        message: "Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
