const express = require("express");
const Customerror = require('./utils/customeError')
const morgan = require("morgan")
const moviesRouter= require('./routes/moviesRoutes')
const globalErrorHandler = require('./controllers/errorController')
const authRouter = require('./routes/authrouter')
let app = express();


const logger =(req,res,next)=>{
    console.log("this is a custom middle ware ")
    next()
    
}
app.use(express.json());
app.use(logger)

if(process.env.NODE_ENV='development')
{

    app.use(morgan('tiny'))
}

// app.use(express.static('./public'))
app.use((req, res, next) => {

    req.requestedAt = new Date().toISOString();
    next();

})
 

//-------------------------------------------------------------GET-------------------------------------------------

// app.get("/api/v1/movies",  getallmovies);
// app.patch("/api/v1/movies/:id", updateMovie);
// app.get("/api/v1/movies/:id",getMovieById );
// app.delete('/api/v1/movies/:id',deleteMovie)
// app.post("/api/v1/movies",postMovie);


app.use('/api/v1/users',authRouter)
app.use('/api/v1/movies',moviesRouter)
app.all('*',(req,res,next)=>{
// res.status(404).json(
//     {
//         status:'fail',
//         message:'Cannot find this url on the server'
//     }
// )

// const err = new Error('cant find the requested url')
// err.status ="fail";
// err.statusCode=404;

const err = new Customerror('cant find the requested urls',404)

next(err)
})

   
app.use(globalErrorHandler)


 module.exports=app;

//----------------------------------------LISTEN-----------------------------------------------------------------------

