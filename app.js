const express = require("express");

const morgan = require("morgan")
const moviesRouter= require('./routes/moviesRoutes')

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

app.use(express.static('./public'))
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



app.use('/api/v1/movies',moviesRouter)


         
 module.exports=app;

//----------------------------------------LISTEN-----------------------------------------------------------------------

