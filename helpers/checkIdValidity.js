const mongoose = require('mongoose');

const checkIdValidity = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send({ message: `${req.params.id} is not a valid ID` });
  }
};

module.exports = { checkIdValidity };
