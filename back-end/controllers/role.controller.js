const Post = async (req, res) => {
  //('role api here')
  let role = req.role;
  let tokenData = { role };
  res.json(tokenData);
};

module.exports = {
    Post
};