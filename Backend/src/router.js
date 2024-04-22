const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import Controllers
const userControllers = require("./controllers/userControllers");
const roleControllers = require("./controllers/roleControllers");
const ruleControllers = require("./controllers/ruleControllers");
const verifyToken = require("./middlewares/verifyToken");

// User management
router.get("/users", verifyToken, userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/users/:id/field", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.post("/login", userControllers.login);

// Role management
router.get("/roles", roleControllers.browse);
router.get("/roles/:id", roleControllers.read);
router.put("/roles/:id", roleControllers.edit);
router.post("/roles", roleControllers.add);
router.delete("/roles/:id", roleControllers.destroy);

// Rule management
router.get("/rules", ruleControllers.browse);
router.get("/rules/:id", ruleControllers.read);
router.put("/rules/:id", ruleControllers.edit);
router.post("/rules", ruleControllers.add);
router.delete("/rules/:id", ruleControllers.destroy);

/* ************************************************************************* */

module.exports = router;
