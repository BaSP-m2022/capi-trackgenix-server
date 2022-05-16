import Models from '../models/Projects';
// Delete project by Id
const deleteProject = async (req, res) => {
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
    return res.json({
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
      employeeRole: req.body.role,
      isProjectManager: req.body.isProjectManager,
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
            data: undefined,
            error: true,
          });
        }
        return null;
      },
    );
    return res.status(201).json({
      msg: 'The Employee has been added',
      data: employee,
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

const createProject = async (req, res) => {
  try {
    const project = new Models({
      projectName: req.body.name,
      projectType: req.body.type,
      employees: req.body.employees,
    });
    const result = await project.save();
    return res.status(201).json({
      msg: `The project has been created. Project :${result}`,
      data: project,
      error: false,
    });
  } catch (err) {
    return res.json({
      msg: `There has been an error: ${err}`,
      data: undefined,
      error: true,
    });
  }
};

// // get all projects
// const getAllProjects = async (res, req) => {
//   try {
//     const AllProjects = await Models.Project.find({});

//     return res.status(200).json(AllProjects);
//   } catch (error) {
//     res.status(500).json({
//       msg: 'There was an error',
//     });
//   }
// };

// get project by id
const getProjectById = async (res, req) => {
  try {
    if (req.params.id) {
      const Project = await Models.Project.findById(req.params.body);

      return res.status(200).json(Project);
    }
    return res.status(400).json({
      msg: 'Missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

export default {
  deleteProject,
  addEmployee,
  createProject,
  //   getAllProjects,
  getProjectById,
//   updateProject,
};
