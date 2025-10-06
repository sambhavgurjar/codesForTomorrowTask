import AppError from "../utils/ErrorHandler.js";

const validationMiddleware = (schema) => {
  return async function (req, res, next) {
    try {
      let { error, value } = await schema.validate(req.body);
      if (error) throw error;
      return next();
    } catch (err) {
      //   console.log(err);
      let error = err.details[0]["message"] || "Validation Failed";
      return next(new AppError(error, 500));
    }
  };
};

export default validationMiddleware;
