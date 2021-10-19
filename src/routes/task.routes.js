const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
});

router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) {
            return res.status(404).send("Essa tarefa não foi encontrada.");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
