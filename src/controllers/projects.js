import Models from '../models/projects';

// Delete project by Id
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        msg: 'missing or wrong id parameter',
      });
    }
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The project has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The project has been deleted',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const addEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const employee = {
      role: req.body.role,
      pm: req.body.pm,
      hours: req.body.hours,
      salary: req.body.salary,
    };
    Models.updateOne(
      { _id: req.params.id },
      { $push: { employees: employee } },
      (err) => {
        if (err) {
          return res.status(404).json({
            msg: 'The project has not been found',
          });
        }
        return null;
      },
    );
    return res.status(201).json({
      msg: 'The Employee has been added',
    });
  } catch (error) {
    return res.json({ msg: `There has been an error: ${error}` });
  }
};
const createProject = async (req, res) => {
  try {
    const project = new Models({
      name: req.body.name,
      type: req.body.type,
      employees: req.body.employees,
    });

    const result = await project.save();
    return res.status(201).json({
      msg: `The project has been created. Project :${result}`,
      data: project,
      error: false,
    });
  } catch (err) {
    return res.json({ msg: `There has been an error: ${err}` });
  }
};

export default {
  deleteProject,
  addEmployee,
  createProject,
};
