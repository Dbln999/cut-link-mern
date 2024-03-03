const uuid = require("uuid");
const Link = require("../models/Link");
const shortid = require("shortid");
class LinkController {
  async createLink(req, res) {
    try {
      const { link } = req.body;
      const id = shortid.generate();
      const newLink = await Link.create({
        from: link,
        to: `${req.protocol}://${req.get("host")}/${id}`,
        short: `${id}`,
        owner: req.user.id,
      });
      await newLink.save();
      return res.json({ message: "Link created", newLink });
    } catch (e) {
      return res.status(400).json({ message: "creation error" });
    }
  }
  async getAll(req, res) {
    try {
      const links = await Link.find({ owner: req.user.id });
      return res.json(links);
    } catch (e) {
      return res.status(400).json({ message: "Getting all error" });
    }
  }
}
module.exports = new LinkController();
