import Admin from '../models/Admins';

// get all admins
const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    if (allAdmins.length <= 0) {
      return res.status(404).json({
        msg: 'Admins list is empty',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Admins list generated',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There was an error: ${error}`,
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
      return res.status(400).json({
        msg: 'Id incomplete',
        data: undefined,
        error: true,
      });
    }
    const adminFound = await Admin.findOne({ _id: id }).exec();
    if (!adminFound) {
      return res.status(404).json({
        msg: `Admin id: ${adminFound.id} not found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: `Admin id: ${adminFound.id} found.`,
      data: adminFound,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      msg: `Error, data not found:(${error})`,
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
    if (!adminCreated) {
      return res.status(400).json({
        msg: 'Error, admin creation failed',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      msg: 'Admin created successfully',
      data: adminCreated,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `There was an error creating the admin, please complete all admin information:(${error})`,
      data: undefined,
      error: true,
    });
  }
};

// delete admin
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
    if (!adminFound) {
      return res.status(400).json({
        msg: 'Error, admin was not deleted',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: `Admin id: ${adminFound.id} deleted successfully.`,
      data: adminFound,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      msg: `Admin id: ${req.params.id} not found.`,
      data: undefined,
      error: true,
    });
  }
};

// edit admin
const editAdmin = async (req, res) => {
  try {
    const adminFound = await Admin.findByIdAndUpdate(req.params.id, req.body);
    if (!adminFound) {
      return res.status(404).json({
        msg: `Admin id: ${req.params.id} not found.`,
        data: undefined,
        error: true,
      });
    }
    const adminEdited = await Admin.findById(req.params.id);
    if (!adminEdited) {
      return res.status(404).json({
        msg: 'Error, admin was not edited',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      msg: `Admin id: ${req.params.id} edited successfully.`,
      data: adminEdited,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `There was an error editing the admin, please check the information:(${error})`,
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
  editAdmin,
};
