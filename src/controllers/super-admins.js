import SuperAdmin from '../models/Super-Admins';
const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

// get all Super Admins

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
});

// getById

router.get('/getById/:id', (req, res) => {
  const supAdm = superAdmins.find((superAdm) => superAdm.id === parseInt(req.params.id, 10));
  if (supAdm) {
    res.send(supAdm);
  } else {
    res.status(400).json({ msg: `No SuperAdmin found with the id: ${req.params.id}` });
  }
});

// getByEmail

router.get('/getByEmail/:email', (req, res) => {
  const superEmail = req.params.email;
  const supAdm = superAdmins.find((superAdm) => superAdm.email === superEmail);
  if (supAdm) {
    res.send(supAdm);
  } else {
    res.status(400).json({ msg: `No SuperAdmin found with the email: ${req.params.email}` });
  }
});
>>>>>>> 06c98b0 (TG: Finished Git methods, routes and schema. Fixed minor problems. Added PostMan.)

// Add Super Admin

async function addSuperAdmin(req, res) {
  try {
    const superData = req.body;
    const superAdmin = new SuperAdmin({
      email: superData.email,
      password: superData.password,
    });
    const added = await superAdmin.save();
    return res.status(201).json({
      msg: `Super Admin succesfully added. \nSuper Admin: ${added}`,
    });
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
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
      msg: `Super Admin updated. \nSuper Admin: ${edit}`,
    });
  } catch (error) {
    return res.json({
      msg: 'And error has ocurred',
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
      msg: `Super Admin succefully deleted \nSuper Admin: ${deletion}`,
    });
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
    });
  }
}

module.exports = router;
=======
import models from '../models/SuperAdmin';

// get all Super Admins

const getAllSuperAdm = async (req, res) => {
  try {
    const allSuperAdm = await models.find();

    return res.status(200).json(allSuperAdm);
  } catch (error) {
    return res.json({ msg: `There has been an error: ${error}` });
  }
};

// getById

const getAdmById = async (req, res) => {
  try {
    if (req.params.id) {
      const superAdm = await models.findById(req.params.id);

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
      const superAdm = await models.where(req.params.email);

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
>>>>>>> 06c98b0 (TG: Finished Git methods, routes and schema. Fixed minor problems. Added PostMan.)
