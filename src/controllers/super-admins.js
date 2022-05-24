import SuperAdmin from '../models/SuperAdmin';

// get all Super Admins

const getAllSuperAdm = async (req, res) => {
  try {
    const allSuperAdm = await SuperAdmin.find();
    if (SuperAdmin.length <= 0) {
      return res.status(404).json({
        msg: 'Super Admin list is empty',
      });
    }
    return res.status(200).json(allSuperAdm);
  } catch (error) {
    return res.json({ msg: `There has been an error: ${error}` });
  }
};

// getById

const getAdmById = async (req, res) => {
  try {
    if (req.params.id) {
      const superAdm = await SuperAdmin.findById(req.params.id);

      return res.status(200).json({
        msg: `SuperAdmin found: \nSuper Admin: ${superAdm}`,
      });
    }
    return res.status(400).json({
      msg: 'Missing ID parameter',
    });
  } catch (error) {
    return res.json({
      msg: 'There was an error',
    });
  }
};

// getByEmail

const getAdmByEmail = async (req, res) => {
  try {
    if (req.params.email) {
      const superAdm = await SuperAdmin.where(req.params.email);

      return res.status(200).json({
        msg: `SuperAdmin found: \nSuper Admin: ${superAdm}`,
      });
    }
    return res.status(400).json({
      msg: 'Missing EMAIL parameter',
    });
  } catch (error) {
    return res.json({
      msg: 'There was an error',
    });
  }
};

// Add Super Admin

async function addSuperAdmin(req, res) {
  try {
    const superData = req.body;
    const superAdmin = new SuperAdmin({
      email: superData.email,
      password: superData.password,
    });
    await superAdmin.save();
    return res.status(201).json({
      msg: 'Super Admin succesfully added',
    });
  } catch (error) {
    return res.json({
    //   msg: 'An error has occurred',
    // It already shows the validation message.
      error: error.details[0].message,
    });
  }
}

// Edit Super Admin

async function editSuperAdmin(req, res) {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const edit = await SuperAdmin.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      password: req.body.password,
    });
    if (!edit) {
      return res.status(404).json({
        msg: 'Super Admin not found',
      });
    }
    return res.status(201).json({
      msg: 'Super Admin updated',
    });
  } catch (error) {
    return res.json({
      msg: 'And error has ocurred',
      error: error.details[0].message,
    });
  }
}

// Delete Super Admin

async function deleteSuperAdmin(req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const deletion = await SuperAdmin.findByIdAndDelete(req.params.id);
    if (!deletion) {
      return res.status(404).json({
        msg: 'Super Admin not found',
      });
    }
    return res.status(200).json({
      msg: 'Super Admin succefully deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
    });
  }
}

export {
  addSuperAdmin,
  editSuperAdmin,
  deleteSuperAdmin,
  getAllSuperAdm,
  getAdmById,
  getAdmByEmail,
};
