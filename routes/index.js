const Router = require("express").Router;

const userController = require("../controllers/userController");

const router = Router();

router.post("/registration",userController.registration);
router.post("/login", userController.login);
router.post("/logout",userController.logout);
router.get("/active/:link",userController.activated);
router.get("/refresh",userController.refresh);
router.get("/users",userController.getUsers);

module.exports = router;