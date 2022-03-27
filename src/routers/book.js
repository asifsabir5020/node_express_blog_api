import express from "express";
import {
  create,
  findAll,
  update,
  findOne,
  remove,
} from "../controllers/bookController";
import { authenticate, authorize } from "../middlewares/auth";
const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(findAll)
  .post(authenticate, authorize("admin"), create);

bookRouter
  .route("/:id")
  .get(findOne)
  .put(authenticate, authorize("admin"), update)
  .delete(authenticate, authorize("admin"), remove);

export { bookRouter };
