const express = require('express');

const { createWorkout, getWorkouts, getWorkoutById, deleteWorkout, updateWorkout } = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

//get all routes
router.get('/', getWorkouts)
//get a single route
router.get('/:id', getWorkoutById)
//add a new route 
router.post('/', createWorkout)
//delete a route
router.delete('/:id', deleteWorkout)
//update a route
router.patch('/:id', updateWorkout)

//export the router
module.exports =router;