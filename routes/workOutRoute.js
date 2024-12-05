const express = require('express');
const router = express.Router();
const {
    saveWorkData,
    getWorkData,
    completeWorkout
} = require('../controller/workOutController');

router.get('/workout/:email', getWorkData);
router.post('/workOut', saveWorkData);
router.put('/workout/:email', completeWorkout);



module.exports = router;