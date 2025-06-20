const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/movieControllers');
const upload = require('../Middleware/fileMiddleware');

router.post('/', upload.single('img'), movieController.addMovie);
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovie)
router.put('/:id', upload.single('img'), movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);


module.exports = router;
