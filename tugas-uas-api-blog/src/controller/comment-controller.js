import commentService from "../service/comment-service.js";

const create = async (req, res, next) => {
  try {
    const request = req.body;
    const postId = req.params.postId;
    const result = await commentService.create(postId, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const result = await commentService.get(postId, commentId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const request = req.body;
    request.id = commentId;
    const result = await commentService.update(user, postId, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    await commentService.remove(user, postId, commentId);

    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const list = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const result = await commentService.list(postId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  remove,
  list,
};
