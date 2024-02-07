import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { credentials, password } = req.body;

    const validUser = await User.findOne({
      $or: [{ username: credentials }, { email: credentials }],
    });
    if (!validUser) return res.status(401).json("Invalid credentials");

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return res.status(401).json("Invalid credentials");

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: none, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    res.status(500).json("Error on server side");
  }
};
