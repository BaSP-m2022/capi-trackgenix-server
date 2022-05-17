import Admin from '../models/Admins';

// get all admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    return res.status(200).json({
      msg: 'Admins list generated',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

// get admin by ID
const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({
        msg: 'Id incomplete',
        data: undefined,
        error: true,
      });
    }
    const adminFound = await Admin.findById(id);
    return res.status(200).json({
      msg: `Admin id: ${adminFound.id} found.`,
      data: adminFound,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error: data not found',
      data: undefined,
      error: true,
    });
  }
};

// create admin
const createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      adminStatus: req.body.adminStatus,
      projects: req.body.projects,
    });
    const adminCreated = await newAdmin.save();
    return res.status(201).json({
      msg: 'Admin created',
      data: adminCreated,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error creating the admin, please complete all admin information',
      data: undefined,
      error: true,
    });
  }
};

// delete admin nuevo
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        msg: 'Id incomplete',
        data: undefined,
        error: true,
      });
    }
    const adminFound = await Admin.findByIdAndDelete(id);
    return res.status(200).json({
      msg: `Admin id: ${adminFound.id} deleted.`,
      data: adminFound,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Admin id: ${req.params.id} not found.`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
};
