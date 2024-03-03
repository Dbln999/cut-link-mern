const Router = require("express");

const Link = require("../models/Link");
const router = new Router();

router.get("/:short", async (req, res) => {
  try {
    const link = await Link.findOne({ short: req.params.short });
    if (link) {
      link.clicks++;
      link.save()
      return res.redirect(link.from);
    }

    return res.status(400).json({ message: "getting error" });

    // return res.json(link)
  } catch (e) {
    return res.status(400).json({ message: "getting error" });
  }
});

module.exports = router;
