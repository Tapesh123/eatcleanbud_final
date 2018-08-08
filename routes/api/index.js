const router = require('express').Router();
const recipeRoutes = require('./recipes');
router.use('/saved', recipeRoutes);
module.exports = router;
