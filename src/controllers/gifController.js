import GifModel from "../models/gif";
import ErrorHandler from "../ErrorHandler/errorhandler";
import CommentModel from "../models/comment";

class GifController {
  static async createGif(req, res, next) {
    try {
      const gif = await GifModel.createGif(
        req.body.title,
        req.url,
        req.auth.userId
      );
      if (!gif) {
        throw new ErrorHandler("something bad happened", 400);
      }
      const message = "GIF image successfully posted";
      const data = {
        ...gif,
        message
      };
      res.status(201).json({
        status: "success",
        data
      });
    } catch (error) {
      next(error);
    }
  }
  static async getSpecificGif(req, res, next) {
    try {
      const gif = await GifModel.getGif(req.params.id);
      const comment = await CommentModel.getGifComments(gif.gifid);
      const comments = [...comment];
      const data = {
        ...gif,
        comments
      };
      res.status(200).json({
        status: "success",
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteGif(req, res, next) {
    try {
      await GifModel.deleteGif(req.params.id, req.auth.userId);
      const data = {
        message: "gif post successfully deleted"
      };
      res.status(200).json({
        status: "success",
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

export default GifController;
