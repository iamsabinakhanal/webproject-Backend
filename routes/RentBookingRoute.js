const express = require('express');
const router = express.Router();
const {
  createRenting,
  getAllRentings,
  getRentingById,
  updateRenting,
  deleteRenting,
} = require('../controller/RentBookingController');

router.post('/', createRenting);
router.get('/', getAllRentings);
router.get('/:id', getRentingById);
router.put('/:id', updateRenting);
router.delete('/:id', deleteRenting);

module.exports = router;