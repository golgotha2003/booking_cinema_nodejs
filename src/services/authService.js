const User = require("../models/users");

const signUp = async (user) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) throw new Error({ error: "Email already exists" });
  const newUser = new User(user);
  await newUser.save();
  const token = await newUser.generateAuthToken();
  return { email: newUser.email, token: token };
};

const signIn = async (email, password) => {
  if (!email || !password)
    throw new Error({ error: "Missing email or password" });
  const user = await User.findByCredentials(email, password);
  if (!user) throw new Error({ error: "Invalid login credentials" });
  const token = await user.generateAuthToken();
  return { email: user.email, token: token };
};

const logout = async (user, token) => {
  if (!user || !token) throw new Error({ error: "There is no login session" });

  const tokenExists = user.tokens.some((token) => token.token === token);
  if (!tokenExists)
    throw new Error({
      error: "Token does not exist or has already been logged out",
    });
  await User.updateOne(
    { _id: user._id },
    { $pull: { tokens: { token: token } } }
  );

  return true;
};

const verifyAccount = async (email, otp, session) => {
  if (!email || !otp) throw new Error({ error: "Missing email or otp" });

  if (Date.now() > session.otp.expiredAt)
    throw new Error({ error: "OTP expired" });

  if (session.otp.code !== otp) throw new Error({ error: "Invalid OTP" });

  const user = await User.findOne({ email });
  if (!user) throw new Error({ error: "User not found" });

  delete session.otp;

  user.is_active = true;
  await user.save();
};

const checkUser = async (email) => {
  if (!email) throw new Error({ error: "Missing email" });

  const user = await User.findOne({ email });
  if (!user) throw new Error({ error: "User not found" });
};

const verifyPassword = async (email, otp, session) => {
  if (!email || !otp) throw new Error({ error: "Missing email or otp" });

  if (Date.now() > session.otp.expiredAt) {
    delete session.otp;
    throw new Error({ error: "OTP expired" });
  }

  if (session.otp.code !== otp) throw new Error({ error: "Invalid OTP" });

  delete session.otp;
};

const resetPassword = async (email, password) => {
  if (!email || !password)
    throw new Error({ error: "Missing email or password" });

  const user = await User.findOne({ email });
  if (!user) throw new Error({ error: "User not found" });

  user.password = password;
  await user.save();
};

module.exports = {
  signUp,
  signIn,
  logout,
  verifyAccount,
  checkUser,
  verifyPassword,
  resetPassword,
};
