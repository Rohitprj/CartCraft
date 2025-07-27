import User from "../models/userSchems.js";
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user?._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  const refreshToken = jwt.sign(
    { userId: user?._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};
const loginOrSignup = async (req, res) => {
  const { address, phone } = req.body;
  try {
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({ address, phone });
    } else {
      user.address = address;
    }
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user.toObject());

    res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    const err = error;
    res.status(500).json({ error: err.message });
  }
};

export { loginOrSignup };
