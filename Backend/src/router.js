const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import Controllers
const userControllers = require("./controllers/userControllers");
const roleControllers = require("./controllers/roleControllers");
const ruleControllers = require("./controllers/ruleControllers");
const guildjControllers = require("./controllers/guildjControllers");
const guildpnjControllers = require("./controllers/guildpnjControllers");
const questControllers = require("./controllers/questControllers");
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

// Guild J management
router.get("/guilds_j", guildjControllers.browse);
router.get("/guilds_j/:id", guildjControllers.read);
router.put("/guilds_j/:id", guildjControllers.edit);
router.post("/guilds_j", guildjControllers.add);
router.delete("/guilds_j/:id", guildjControllers.destroy);

// Guild PNJ management
router.get("/guilds_pnj", guildpnjControllers.browse);
router.get("/guilds_pnj/:id", guildpnjControllers.read);
router.put("/guilds_pnj/:id", guildpnjControllers.edit);
router.post("/guilds_pnj", guildpnjControllers.add);
router.delete("/guilds_pnj/:id", guildpnjControllers.destroy);

// Quest management
router.get("/quests", questControllers.browse);
router.get("/quests/:id", questControllers.read);
router.put("/quests/:id", questControllers.edit);
router.post("/quests", questControllers.add);
router.delete("/quests/:id", questControllers.destroy);

/* ************************************************************************* */

module.exports = router;
