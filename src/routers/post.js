import express from "express";
import {
  create,
  findAll,
  update,
  findOne,
  remove,
  userAllPosts,
  logedInUserAllPosts,
} from "../controllers/postController";
import { authenticate } from "../middlewares/auth";
const postRouter = express.Router();

postRouter.route("/user/:id").get(userAllPosts);
postRouter.route("/user").get(authenticate, logedInUserAllPosts);


postRouter.route("/").get(findAll).post(authenticate, create);

postRouter
  .route("/:id")
  .get(findOne)
  .put(authenticate, update)
  .delete(authenticate, remove);


export { postRouter };

userAllPosts;
