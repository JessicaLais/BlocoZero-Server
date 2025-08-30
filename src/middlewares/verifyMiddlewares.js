export const verifyBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(500).json({message:"empty request body"});
  }
  
  next();
};

export const verifyRoutes = (req, res, next) => {
  res.status(404).json({
    error: "Route not found"
  });
}

