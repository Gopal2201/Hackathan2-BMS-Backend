const router = require("express").Router();

const service = require("../services/authService");

router.post("/register", service.register);
router.post("/login", service.login);
router.post("/login/Admin", service.AdminLogin);

module.exports = router;