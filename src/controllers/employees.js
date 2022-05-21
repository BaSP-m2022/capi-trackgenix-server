import Employees from '../models/Employees';

const getAllEmployees = async (req, res) => {
  const allEmployees = await Employees.find({});
  try {
    if (allEmployees.length > 0) {
      return res.status(404).json({
        msg: 'Employees list is empty',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      data: allEmployees,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const empl = await Employees.findById(req.params.id);
    if (empl) {
      return res.status(200).json({
        data: empl,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `No Employee with id = ${req.params.id}`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employees({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      location: req.body.location,
    });
    const newEmp = await newEmployee.save();
    if (newEmp) {
      return res.status(400).json({
        msg: 'Error, Employee creation failed',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      msg: 'New Employee created',
      data: newEmp,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There has been an error',
      error: `The error is: ${error}`,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const empl = await Employees.findByIdAndDelete(req.params.id);
    if (!empl) {
      return res.status(404).json({
        msg: `The Employee with id = ${req.params.id} has not been found`,
      });
    }
    return res.status(200).json({
      msg: `The Employee with id = ${req.params.id} has been deleted`,
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      error: `The error is: ${error}`,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'id missing',
        data: undefined,
        error: true,
      });
    }
    const emplo = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!emplo) {
      return res.status(404).json({
        message: `The Employee with id = ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee succesfully updated',
      data: emplo,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
};

export default {
  getAllEmployees, getEmployeeById, createEmployee, deleteEmployee, editEmployee,
};
