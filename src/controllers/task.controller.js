const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;

            const task = await TaskModel.findById(taskId);

            if (!task) {
                return this.res
                    .status(404)
                    .send("Essa tarefa não foi encontrada.");
            }

            return this.res.status(200).send(task);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            const allowedUpdates = ["isCompleted"];
            const requestedUpdates = Object.keys(taskData);

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(500)
                        .send("Um ou mais campos inseridos não são editáveis.");
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            console.log(error);
            return this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
