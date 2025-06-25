const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.get("", taskController.getAll);
router.post("", taskController.addTask);
router.get("/:id", taskController.getOneTask);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
