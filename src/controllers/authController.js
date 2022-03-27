import { StatusCodes } from "http-status-codes";
import { User } from "../models/user";
import { checkPermission, isAdmin } from "../utils";
import {
  NotFoundError,
  UnAuthenticatedError,
  UnAuthorizedError,
} from "../utils/errors";

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

  if (!user.status) {
    throw new UnAuthorizedError("Your account has been disabled");
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

export const update = async (req, res) => {
  const { userRole, userId } = req.user;
  const { id } = req.params;
  const userParams = {};
  userParams.name = req.body.name;

  if (isAdmin(userRole)) {
    if (req.body.status !== undefined) {
      userParams.status = req.body.status;
    }
  }

  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new NotFoundError(`No User with id :${id}`);
  }

  if (!checkPermission(userId, id) && !isAdmin(userRole)) {
    throw new UnAuthorizedError();
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, userParams, {
    new: true,
    runValidators: false,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: updatedUser,
  });
};
