const fs = require("fs");




let jsondata = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

//--------------------------------ROUTE HANDLER---------------------------------


const getallmovies= (req,res)=>{ 
    res.status(200).json({
        status: "Sucess",
        requestedAt:req.requestedAt,
        count: jsondata.length,
        data: {
          movies: jsondata,
        },
      });
}



const getMovieById=(req, res) => {
    let id = +req.params.id;
    let movies = jsondata.find((val) => {
      return val.id === id;
    });

      res.status(200).json({
        status: "success",
        data: {
          movies: movies,
        },
      });
    
  }


const updateMovie= (req, res) => {
    let id = +req.params.id;
    let moviesToUpdate = jsondata.find((val) => val.id === id);
  
//   if(!moviesToUpdate)
//   {
//       res.status(400).json({
//           status:'fail',
//           message:'No movie object with this id found'
//       })
//   }
  
  
    let index = jsondata.indexOf(moviesToUpdate);
    const updatedMovie = { ...moviesToUpdate, ...req.body };
    jsondata[index] = updatedMovie;
  
    fs.writeFile("./data/movies.json", JSON.stringify(jsondata), (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          movies: updatedMovie,
        },
      });
    });
  }


const deleteMovie=(req,res)=>{

    let id = +req.params.id
    let movieToDelete = jsondata.find(val=>val.id===id)
    
    // if(!movieToDelete)
    //     {
    //         res.status(404).json({
    //             status:'fail',
    //             message:'No movie object with this id found'
    //         })
    //     }
    
    let index = jsondata.indexOf(movieToDelete)
    
    jsondata.splice(index,1)
    
    fs.writeFile("./data/movies.json", JSON.stringify(jsondata), (err) => {
        if (err) {
          console.log(err.message);
          return;
        }
        res.status(204).json({
          status: "success",
          data: {
            movies: null,
          },
        });
      });
    }


const validateBody=(req,res,next)=>{
if(!req.body.name || !req.body.release_year)
{
return res.status(400).json(
    {
        status:"fail",
        message:"not a valid movie data"
    }
)

}

next()
}

const postMovie= (req, res) => {
    console.log(req.body);
    const newId = jsondata[jsondata.length - 1].id + 1;
    const newmovie = { id: newId, ...req.body };
    jsondata.push(newmovie);
    fs.writeFile("./data/movies.json", JSON.stringify(jsondata), (err) => {
      res.status(201).json({
        status: "sucess",
        data: {
          movies: jsondata,
        },
      });
    });
  }


  const checkId=(req,res,next,value)=>{
    
    // let id = +req.params.id
    //get id or value same thing 
    let movie = jsondata.find(val=>val.id=== +value)
    
    if(!movie)
        {
           return res.status(404).json({
                status:'fail',
                message:'No movie object with this id found'
            })
        }
    
        next()
  }


  module.exports={
    getallmovies,
    getMovieById,
    postMovie,
    updateMovie,
    deleteMovie,
    checkId,
    validateBody
  }