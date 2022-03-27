import { StatusCodes } from "http-status-codes";
import { Book } from "../models/book.js";
import { NotFoundError } from "../utils/errors";

export const findAll = async (req, res) => {
  const books = await Book.find();
  res.status(StatusCodes.OK).json({
    success: true,
    data: books,
  });
};

export const create = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: book,
  });
};

export const findOne = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({ _id: id });

  if (!book) {
    throw new NotFoundError(`No book with id :${id}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: book,
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({ _id: id });

  if (!book) {
    throw new NotFoundError(`No book with id :${id}`);
  }

  const updatedBook = await Book.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: updatedBook,
  });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({ _id: id })

  if (!book) {
    throw new NotFoundError(`No book with id :${id}`)
  }
  await book.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Success! Book removed',
  });
}