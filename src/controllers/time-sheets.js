import TimeSheet from '../models/timeSheet';

// Return all timeSheets
const getAllSheets = async (req, res) => {
  try {
    const AllSheets = await TimeSheet.find({});

    return res.status(200).json(AllSheets);
  } catch (error) {
    return res.status(500).json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

// Return the timeSheet with the given ID
const getSheetById = async (req, res) => {
  try {
    if (req.params.id) {
      const sheet = await TimeSheet.findById(req.params.id);

      return res.status(200).json(sheet);
    }
    return res.status(400).json({
      msg: 'The given ID doesnt exist',
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

// Return the timeSheet created
const createSheet = async (req, res) => {
  try {
    const sheet = new TimeSheet({
      idEmployee: req.body.idEmployee,
      hoursWorked: req.body.hoursWorked,
      dailyHS: req.body.dailyHS,
    });

    const added = await sheet.save();
    return res.status(201).json({
      msg: `The timeSheet has been created succesfully. \nSheet: ${added}`,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

// Return the timeSheet edited
const editSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TimeSheet.findByIdAndUpdate(
      id,
      {
        hoursWorked: req.body.hoursWorked,
        dailyHS: req.body.dailyHS,
      },
    );

    if (!result) {
      return res.status(404).json({
        msg: `The sheet has not been found ${result}`,
      });
    }
    return res.status(201).json({
      msg: 'The sheet has been edited',
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

// Return the deleted proyect
const deleteSheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const result = await TimeSheet.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'The sheet has not been found',
      });
    }
    return res.status(200).json({
      msg: 'the project has been succefully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      msg: `There has been an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

// Return the timeSheet with that horsWorked
const getByHours = async (req, res) => {
  try {
    const { hoursWorked } = req.query;
    const response = await TimeSheet.find({ hoursWorked });
    if (!response || !response.length) {
      return res.status(404).json({
        msg: 'The timeSheet has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The timeSheet has been found',
      data: response,
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

export {
  getAllSheets,
  getSheetById,
  createSheet,
  editSheet,
  deleteSheet,
  getByHours,
};
