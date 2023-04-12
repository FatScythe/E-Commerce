const authenticateUser = async (req, res, next) => {
  console.log(req.user);
  next();
};
