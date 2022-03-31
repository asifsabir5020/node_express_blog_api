import { StatusCodes } from "http-status-codes";
import { Post } from "../models/post";
import { checkPermission, isAdmin } from "../utils";
import { NotFoundError, UnAuthorizedError } from "../utils/errors";

export const findAll = async (req, res) => {
  const posts = await Post.find();
  res.status(StatusCodes.OK).json({
    success: true,
    data: posts,
  });
};

export const create = async (req, res) => {
  const { userId } = req.user;
  req.body.user = userId;
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: post,
  });
};

export const findOne = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });

  if (!post) {
    throw new NotFoundError(`No post with id :${id}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: post,
  });
};

export const update = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });

  if (!post) {
    throw new NotFoundError(`No post with id :${id}`);
  }

  if (!checkPermission(userId, id)) {
    throw new UnAuthorizedError();
  }

  const updatedPost = await Post.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: updatedPost,
  });
};

export const remove = async (req, res) => {
  const { userRole, userId } = req.user;
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });

  if (!post) {
    throw new NotFoundError(`No post with id :${id}`);
  }

  if (!checkPermission(userId, post.user) && !isAdmin(userRole)) {
    throw new UnAuthorizedError();
  }

  await post.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Success! Post removed",
  });
};

export const userAllPosts = async (req, res) => {
  const posts = await Post.find({ user: req.params.id });
  res.status(StatusCodes.OK).json({
    success: true,
    data: posts,
  });
};

export const logedInUserAllPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({
    success: true,
    data: posts,
  });
};
