// const fs = require("fs");
const Customerror = require('../utils/customeError');
const Movie = require('./../models/movieModel')
const Apifeatures = require('./../utils/apiFeatures')
const asyncErrorHandler = require('./../utils/asynchandler')

const getHighestRated = (req, res ,next)=>{
  req.query.limit = '5';
  req.query.sort = '-ratings'
  next()
}



//--------------------------------ROUTE HANDLER----------FOR DATABASE--------------------------------------------------------------------------------------------

const postMovie=asyncErrorHandler(async (req,res)=>{
  try
  {

  const feature = new Apifeatures(Movie.find(),req.query).filter().sort().limitfields().paginate();
  let movies= await  feature.query 

    const movie=await Movie.create(req.body) 

    res.status(201).json(
      {
        status:'success',
        data:{
          movies
        }
      }
    )
  }catch(err)
  {
    const error = new Customerror(err.message,400)
    next(error)
  }
  
})

const getallmovies =async (req,res)=>{
try
{
  res.status(200).json({
    status:"success",
    length:movies.length,
    data:{
      movie:movies
    }
  })

}catch(err)
{
  res.status(400).json({
    status:"failed",
    message:err.message
  })
}


}




const getMovieById =async (req,res)=>{
try
{
  // const movie= await Movie.find({_id:req.params?.id})
  const movie= await Movie.findById(req.params.id);

  res.status(200).json({
    status:"success",
    data:{
      movie:movie
    }
  })

}
catch(err)
{
  res.status(400).json({
    status:"failed",
    message:err.message
  }) 
}

}





const updateMovie =async (req,res)=>{

  try{
    movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

    res.status(200).json({
      status:"success",
      data:{
        movie:movie
      }
    })
  
  }catch(err)
  {
    res.status(400).json({
      status:"failed",
      message:err.message
    }) 
}
}



const deleteMovie =async(req,res)=>{
  try {
    movie = await Movie.findById(req.params.id);
    res.status(204).json(
      {
        status:"sucess",
        data:null
      }
    )
    
  } catch (error) {
    res.status(400).json({
      status:"failed",
      message:error.message
    }) 
  }
  
}
 


const getMoviesStats = async (req,res)=>{
  try{

    const stats =await Movie.aggregate([
      { $match:{ratings:{$gte:4.5}}},
      {$group:{
        _id:'$releaseYear',
        avgRating:{$avg:'$ratings'},
        avgPrice:{$avg:'$price'},
        minPrice:{$min:'$price'},
        maxPrice:{$max:'$price'},
        totalPrice:{$sum:'$price'},
        movieCount: {$sum:1}
      }},
      {$sort:{minPrice:1}},
      { $match:{maxPrice:{$gte:60}}}
    ]);
    res.status(200).json(
      {
        count:stats.length,
        status:"sucess",
        data:stats
      })

  }
  catch(err)
  {
    res.status(400).json({
      status:"failed",
      message:error.message
    }) 
  }
}



const getMoviesbyGenre =async (req,res)=>{
try{

const genre = req.paras.genres;

const movies = await Movies.aggregate([
  {$unwind:'$generes'},
  {$group:{
    _id:'$genres',
    movieCount:{$sum:1},
    movies:{$push:'$name'},
  }},
  {$addFields:{genres:"$_id"}},
  {$project:{_id:0}},
  {$sort:{movieCount:-1}},
  {$limit: 6},
  {$match:{genre:genre}}
]);


  res.status(200).json(
    {
      count:movies.length,
      status:"sucess",
      data:{
        Movies:movies
      }
    })
}
catch(err)
{
  res.status(400).json({
    status:"failed",
    message:err.message
  }) 
}
}

  module.exports={
    getallmovies,
    getMovieById,
    postMovie,
    updateMovie,
    deleteMovie,
    getHighestRated,
    getMoviesStats,
    getMoviesbyGenre
    // checkId,
    // validateBody
  }


  //--------------------------------BELOW THIS FOR JSON FILE------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  
// let jsondata = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

// const getallmovies= (req,res)=>{ 
//   res.status(200).json({
//       status: "Sucess",
//       requestedAt:req.requestedAt,
//       count: jsondata.length,
//       data: {
//         movies: jsondata,
//       },
//     });
// }



// const getMovieById=(req, res) => {
//   let id = +req.params.id;
//   let movies = jsondata.find((val) => {
//     return val.id === id;
//   });

//     res.status(200).json({
//       status: "success",
//       data: {
//         movies: movies,
//       },
//     });
  
// }


// const updateMovie= (req, res) => {
//   let id = +req.params.id;
//   let moviesToUpdate = jsondata.find((val) => val.id === id);

// //   if(!moviesToUpdate)
// //   {
// //       res.status(400).json({
// //           status:'fail',
// //           message:'No movie object with this id found'
// //       })
// //   }


//   let index = jsondata.indexOf(moviesToUpdate);
//   const updatedMovie = { ...moviesToUpdate, ...req.body };
//   jsondata[index] = updatedMovie;

//   fs.writeFile("./data/movies.json", JSON.stringify(jsondata), (err) => {
//     if (err) {
//       console.log(err.message);
//       return;
//     }
//     res.status(200).json({
//       status: "success",
//       data: {
//         movies: updatedMovie,
//       },
//     });
//   });
// }


// const deleteMovie=(req,res)=>{

//   let id = +req.params.id
//   let movieToDelete = jsondata.find(val=>val.id===id)
  
//   // if(!movieToDelete)
//   //     {
//   //         res.status(404).json({
//   //             status:'fail',
//   //             message:'No movie object with this id found'
//   //         })
//   //     }
  
//   let index = jsondata.indexOf(movieToDelete)
  
//   jsondata.splice(index,1)
  
//   fs.writeFile("./data/movies.json", JSON.stringify(jsondata), (err) => {
//       if (err) {
//         console.log(err.message);
//         return;
//       }
//       res.status(204).json({
//         status: "success",
//         data: {
//           movies: null,
//         },
//       });
//     });
//   }


// const validateBody=(req,res,next)=>{
// if(!req.body.name || !req.body.release_year)
// {
// return res.status(400).json(
//   {
//       status:"fail",
//       message:"not a valid movie data"
//   }
// )

// }

// next()
// }

// const postMovie= (req, res) => {
//   console.log(req.body);
//   const newId = jsondata[jsondata.length - 1].id + 1;
//   const newmovie = { id: newId, ...req.body };
//   jsondata.push(newmovie);
//   fs.writeFile("./data/movies.json", JSON.stringify(jsondata), (err) => {
//     res.status(201).json({
//       status: "sucess",
//       data: {
//         movies: jsondata,
//       },
//     });
//   });
// }


// const checkId=(req,res,next,value)=>{
  
//   // let id = +req.params.id
//   //get id or value same thing 
//   let movie = jsondata.find(val=>val.id=== +value)
  
//   if(!movie)
//       {
//          return res.status(404).json({
//               status:'fail',
//               message:'No movie object with this id found'
//           })
//       }
  
//       next()
// }