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

export {
  getAllSuperAdm,
  getAdmById,
  getAdmByEmail,
};
