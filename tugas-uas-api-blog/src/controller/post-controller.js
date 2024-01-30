import postService from "../service/post-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await postService.create(user, request);
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
    const result = await postService.get(postId);
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
    const request = req.body;
    request.id = postId;
    const result = await postService.update(user, request);

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
    await postService.remove(user, postId);

    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const request = {
      page: req.query.page,
      size: req.query.size,
      slug: req.query.slug,
      title: req.query.title,
      summary: req.query.summary,
      content: req.query.content,
      authorId: req.query.authorId,
    };

    const result = await postService.search(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
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
  search,
};
