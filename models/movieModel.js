const mongoose = require('mongoose')




//this is the schema based on which we will create a model 
const movieSchema = new mongoose.Schema({
    name:
    {
      type:String,
      required:[true,'Name is required field'],
      unique:true,
      trim:true
  
    },
    description: {
      type:String,
      required:true,
      trim:true
      
    },
    duration:
    {
      type:Number,
      required:[true,'Duration is required'],
      
    },
    ratings:{
      type:Number,
      required:true,
    },
    totalRating:{
      type:Number,
      required:true
    },
    releaseYear:{
      type:Number,
      required:[true,'Release year is required field']
    },
    releaseDate:{
      type:Number,
      required:true
    },
    createdAt:{
      type:Date,
      default:Date.now()
    },
    genres:{
      type:[String],
      required:[true,'genres is required filed']
    },
    directors:{
      type:[String],
      required:[true,'Director is required field']
    },
    coverImage:{
      type:String,
      required:[true,'Cover image is required field']
    },
    actors:{
      type:[String],
      required:[true,"acotrs is the required field"]
    },
    price:{
      type:Number,
      required:[true,'price is the required filed']
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
  