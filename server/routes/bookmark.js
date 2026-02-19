const Bookmark = require("../models/Bookmark");

module.exports = (io) => {
  const router = require("express").Router();

  function isAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json("Not authorized");
  }

  router.get("/", isAuth, async (req, res) => {
    const bookmarks = await Bookmark.find({ userId: req.user.id });
    res.json(bookmarks);
  });

  router.post("/", isAuth, async (req, res) => {
    const bookmark = await Bookmark.create({
      userId: req.user.id,
      title: req.body.title,
      url: req.body.url,
    });
    io.emit("refresh");
    res.json(bookmark);
  });

  router.delete("/:id", isAuth, async (req, res) => {
    await Bookmark.findByIdAndDelete(req.params.id);
    io.emit("refresh");
    res.json("Deleted");
  });

  return router;
};