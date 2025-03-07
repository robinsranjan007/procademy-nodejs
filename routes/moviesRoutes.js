const express= require('express')
const  {
    getallmovies,
    getMovieById,
    postMovie,
    updateMovie,
    deleteMovie,
    getHighestRated,
    getMoviesStats,
    getMoviesbyGenre
//     validateBody,
// checkId
}=require('../controllers/movies.controllers.js')

const router=express.Router()


//it will only run when there is a param present in the route here :id

// router.param('id', checkId)


router.route('/highest-rated').get(getHighestRated)


router.route('/movie-stats').get(getMoviesStats)

router.route('/movies-by-genre').get(getMoviesbyGenre)

router.route('/')
        .get(getallmovies)
        .post( postMovie)

router.route('/:id')
        .get(getMovieById)
        .patch(updateMovie)
        .delete(deleteMovie)


module.exports=router