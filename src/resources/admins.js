/* eslint-disable import/prefer-default-export */
const admins = require('../data/admins.json');

const getAdminsAll = (req, res) => {
  res.status(200).json({
    data: admins,
  });
};

export {
  getAdminsAll,
};
