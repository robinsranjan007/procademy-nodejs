const mongoose = require('mongoose')




//this is the schema based on which we will create a model 
const movieSchema = new mongoose.Schema({
    name:
    {
      type:String,
      required:[true,'Name is required field'],
      unique:true
  
    },
    description: {
      type:String,
      required:true,
      
    },
    duration:
    {
      type:Number,
      required:[true,'Duration is required'],
      
    },
    ratings:{
      type:Number,
      required:true,
      default:1.0
    }
  })
  
  
  //this will be created inside the mongoose 
  const Movie = mongoose.model(
    'Movie',movieSchema)
  
//   const testMovie = new Movie({
//     name:"Die Hard",
//     description:"Action movie",
//     duration:180,
//     ratings:4.5
//   })
  
//   testMovie.save().then((val)=>{console.log(val)}).catch((err)=>{
//      console.log("error occured :"+err.message)
//   })


  module.exports =Movie
  