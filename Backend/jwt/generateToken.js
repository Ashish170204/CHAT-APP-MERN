import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "5d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // xss
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "strict", // csrf
    // sameSite: "lax",
  });
};
export default createTokenAndSaveCookie;

