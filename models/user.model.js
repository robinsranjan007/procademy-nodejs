const mongoose =require("mongoose")
 const bycrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,'name is required']
},
email:{
    type:String,
    required:[true,'email is required'],
    unique:true,
    lowercase:true,
    

},
photo:{
    type:String,

},
password:{
    type:String,
    required:[true,'please enter a password'],
    minlegth:8
},
confirmPassword:{
type:String,
required:[true,'please confirm your password'],
validate:{
    validator:function(val)
    {
      return  val === this.password
    },
    message:'confirm password does not match'
}
}


})


userSchema.pre('save',async function(next){
    if(this.isModified('password')) return next();

    //encrypt the password before saving it using bycrypt it is also called hashig
   this.password = await bycrypt.hash(this.password,12)

   this.confirmPassword = undefined;
   next();

})


const User = mongoose.model('User',userSchema);


module.exports= User;