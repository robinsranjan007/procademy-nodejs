// const fs = require("fs");
const Movie = require('./../models/movieModel')


const getHighestRated = (req, res ,next)=>{
  req.query.limit = '5';
  req.query.sort = '-ratings'
  next()
}
//--------------------------------ROUTE HANDLER----------FOR DATABASE--------------------------------------------------------------------------------------------

const postMovie=async (req,res)=>{
  try
  {

   

    
    const movie=await Movie.create(req.body) 

    res.status(201).json(
      {
        status:'success',
        data:{
          movie:movie
        }
      }
    )
  }catch(err)
  {
    res.status(400).json({
      status:'fail',
      message:err.message
    })
  }
  
}

const getallmovies =async (req,res)=>{
try
{

// console.log(req.query) //give query paramets in object form
// const exludeField=['sort','page','limit','field'];

// const queryObj={...req.query}; 
// exludeField.forEach((val)=>{
//   delete queryObj[val]
// })

// console.log(req.query)

let querystr=JSON.stringify(req.query)
querystr=querystr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>{
 return `$${match}`
})

const queryObj=JSON.parse(querystr)
// console.log(queryObj);





let query=  Movie.find(queryObj);

//SORTING
if(req.query.sort)
  {
    const sortBy = req.query.sort.split(',').join(' ')
    
   query= query.sort( sortBy);
  }
  else
  {
    query= query.sort( 'createdAt');

  }

  //LIMITING

  if(req.query.fields)
  {
    // query.select('name duration price ratings')
    const fields = req.query.fields.split(',').join(' ')
    query=query.select(fields)
    console.log(fields);
  }else{
    query=query.select('-__v')
  }

  //PAGINATION
  const page = req.query.page *1|| 1;
  const limit = req.query.limit*1 || 10;
  //page 1:1-10; page 2 :11-20;page 3:21-30
  const skip = (page-1)*limit;
  query=query.skip(skip).limit(10);

  if(req.query.page)
  {
    const moviesCount = Movie.countDocuments();
    if(skip>=moviesCount)
    {
      throw new Error('This page is not found!')
    }
  }

const movies = await query;

  // const movies=await Movie.find()
  //             .where('duration')
  //             .gte(req.query.duration)
  //             .where('ratings')
  //             .gte(req.query.ratings)
  //             .where('price')
  //             .lte(req.query.price)
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
 

  module.exports={
    getallmovies,
    getMovieById,
    postMovie,
    updateMovie,
    deleteMovie,
    getHighestRated
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