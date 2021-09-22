const express = require('express');
const { searchPlayers, getPlayers } = require('../controllers/playerController');


const router = express.Router();


router.get('/', searchPlayers);
router.get('/id', getPlayers);

module.exports = router;

// router.get('/saved', getPlayers);