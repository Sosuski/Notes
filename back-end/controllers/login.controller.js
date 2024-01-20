const Users = require("../schemas/users.schema.js");
const jwt = require("jsonwebtoken");

const Post = async (req, res) => {
  console.log('login cont',req.body.username, req.body.password)
  const user = await Users.findOne({ username: req.body.username });
  if (user) {
    const result = req.body.password === user.password;
    if (result) {
      let key = { username: req.body.usernamee, role: req.body.role };
      const token = await jwt.sign(
        { key },
        "fdsafewt34aqrt43rtq23dsad",
        { algorithm: "HS256" },
        { expiresIn: "24h" }
      );
      res.status(200).json({
        status: "success",
        token: {
          token,
        },
      });
    } else res.status(404).send("Status: Not Found");
  }
  res.status;
};

module.exports = {
    Post
};