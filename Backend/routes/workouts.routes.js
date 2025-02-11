const express = require('express');
const { createWorkout, getWorkout, getWorkoutById, deleteWorkout } = require('../controllers/WorkoutController');


const router = express.Router();

router.get('/',getWorkout)

router.get('/:id', getWorkoutById);



router.patch('/:id', (req, res) => {
    res.json({msg:`Update route with id: ${req.params.id}`});
}   );

router.delete('/:id', deleteWorkout)

router.post('/', createWorkout)


module.exports = router;

