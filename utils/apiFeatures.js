class Apifeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryStr = queryString;
  }

  filter() {
    

    let queryString = JSON.stringify(this.queryStr);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
      return `$${match}`;
    });

    const queryObj = JSON.parse(querystr);
    this.query = this.query.find(queryObj);


    return this;

  }


  sort()
  {
    if(req.query.sort)
        {
          const sortBy = req.query.sort.split(',').join(' ')
          this.query= query.sort( sortBy);
        }
        else
        {
          this.query= query.sort( 'createdAt');
      
        }


        return this;
  }

  limitfields()
  {
    if(this.query.fields)
        {
          const fields = this.query.fields.split(',').join(' ')
          query=query.select(fields)
          console.log(fields);
        }else{
          this.query=this.query.select('-__v')
        }
        return this;

  }

paginate()
{
    const page = this.queryStr.page *1|| 1;
  const limit = this.queryStr.limit*1 || 10;
  //page 1:1-10; page 2 :11-20;page 3:21-30
  const skip = (page-1)*limit;
  this.query=this.query.skip(skip).limit(10);

//   if(this.queryStr.page)
//   {
//     const moviesCount =await Movie.countDocuments();
//     if(skip>=moviesCount)
//     {
//       throw new Error('This page is not found!')
//     }
//   }

return this;

}




}

module.exports = Apifeatures;
