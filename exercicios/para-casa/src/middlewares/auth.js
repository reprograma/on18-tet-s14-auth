const jwt = require("jsonwebtoken");
require("dotenv-safe").config();

exports.getAuth = (req, res, next) => {
  const authHeader = req.get("authorization");
  if (!authHeader) {
    return res.status(401).send({
      message: "Unauthorized user!",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token not found!");
  }

  try {
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) {
        return res.status(401).send({
          message: "Token error!",
        });
      }
      next();
    });
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
  User.userSchema.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(users);
  });
};
