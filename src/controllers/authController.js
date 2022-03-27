import { StatusCodes } from "http-status-codes";
import { User } from "../models/user";
import { NotFoundError, UnAuthenticatedError } from "../utils/errors";

export const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: { user, token },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

export const me = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with id :${userId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
};

export const findAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({
    success: true,
    data: users,
  });
};
