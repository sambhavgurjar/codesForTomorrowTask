function asyncHandler(fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req,res)).catch((err) => {
      return next(err);
    });
  };
}

export default asyncHandler;
