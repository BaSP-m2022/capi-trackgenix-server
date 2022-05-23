import Models from '../models/Tasks';

const getAllTask = async (req, res) => {
  try {
    const tasks = await Models.find();
    if (tasks.length <= 0) {
      return res.status(404).json({
        msg: 'There are no task in the database',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: { tasks },
      data: undefined,
      error: false,
    });
  } catch (err) {
    return res.json({ msg: `There has been an error: ${err}` });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        msg: 'missing or wrong id parameter',
        data: undefined,
        error: true,
      });
    }
    const task = await Models.findById(id);
    if (!task) {
      return res.status(404).json({
        msg: 'The task has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: { task },
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Models({
      idEmployee: req.body.idEmployee,
      taskName: req.body.taskName,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
    });

    const result = await task.save();
    return res.status(201).json({
      msg: 'The Task has been created',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.json({
      msg: 'There has been an error:',
      data: err,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        msg: 'missing or wrong id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The task has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The task has been deleted',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const filterByPriority = async (req, res) => {
  try {
    const { priority } = req.query;

    const response = await Models.find({ priority });
    if (!response || !response.length) {
      return res.status(404).json({
        msg: 'The task has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The task has been found',
      data: response,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        msg: 'missing or wrong id parameter',
        data: undefined,
        error: true,
      });
    }
    const task = req.body;
    const response = await Models.findByIdAndUpdate(id, {
      idEmployee: task.idEmp,
      taskName: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
    if (!response) {
      return res.status(404).json({
        msg: 'The task has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The task has been Updated',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTask,
  getTaskById,
  createTask,
  deleteTask,
  filterByPriority,
  editTask,
};
