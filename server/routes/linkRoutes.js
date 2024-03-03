const Router = require("express");
const linkController = require("../controller/linkController");
const router = new Router();
const auth = require("../middleware/auth.middleware");
const cookieJwt = require("../middleware/cookie.middleware");

router.post("/create", auth, linkController.createLink);
router.get("/get", cookieJwt, linkController.getAll);

module.exports = router;
