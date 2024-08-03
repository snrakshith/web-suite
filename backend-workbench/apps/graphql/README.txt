Schema
- How our data looks like, Query, Mutation

Resolvers
- functions that return data what verifys to the 
  spec
- has 3 parameters that we can utilise
  - parent
  - args ( an object, that has all the data that user passed )
  - context
  

There are 2 different data types
- Scalar 
 - String, Int, Float, Boolean
 - If the data is not resolved with Scalar, it goes back to null
- Object