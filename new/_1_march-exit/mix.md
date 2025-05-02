# Nest.js

- Service -> Bussiness Logic
- Modules -> Files
- Controller -> Routes
- Pipe & DTOs -> Validation
- Gaurds -> User Authentication
- Repository -> Access to Database

# Typescript

- Generic Types
- Mapped Types
- Utility Types
- Conditional Types
- Interface vs Types
- Inferences

# MongoDB

- CRUD
- DB Design & Relationships
- Indexing
- Aggregation Framework
- Sharding
- Replication
- Transactions
- Change Streams
- Geo-Spatial Queries
- Migrations
- Backup & Restore
- Performance Tuning
- Security
- Monitoring
- Atomicity & Consistency
- Durability

# Logical operators

- $and
- $or
- $not
- $nor
- $expr

# Comparision operators

- $eq
- $ne
- $lt
- $gt
- $lte
- $gte
- $in
- $nin
- $exists
- $size
- $mod
- $regex
- $elemMatch
- $all

# Array operators

- $push
- $addToSet
- $pop
- $pull
- $pullAll
- $set

# Object operators

- $set
- $unset
- $rename
- $currentDate
- $inc
- $min
- $max
- $mul
- $bit
- $slice
- $pushAll

# Geo operators

- $near
- $nearSphere
- $geoIntersects
- $geoWithin
- $geoWithinSphere
- $geoWithinBox
- $geoWithinPolygon
- $geoWithinCenter
- $geoWithinCenterSphere
- $geoWithinDistance
- $geoWithinDistanceSphere

# Bitwise operators

- $bitsAllClear
- $bitsAllSet
- $bitsAnyClear
- $bitsAnySet
- $bitsSet
- $bitsUnset

# API Security

- JWT
- OAuth 2.0
- API Keys
- Basic Authentication
- Digest Authentication
- Bearer Authentication
- API Rate Limiting
- API Throttling
- API Versioning
- API Logging
- API Monitoring
- API Caching
- Data Masking

# API Performance Optimization

- Caching
- Compression
- Load Balancing
- Rate Limiting
- API Versioning
- API Throttling

# API Security

- CORS => cors
- SSL/TLS
- NoSQL Injection => express-mongo-sanitize
- XSS Protection => xss-clean
- Secure HTTP Headers => helmet
- Rate Limiting => express-rate-limit
- Input Validation => express-validator
- Error Handling => express-async-errors
- File Upload => multer
- HTTP Parameter Pollution => hpp
- API Documentation generators like Postman/ docgen

# Nest.js vs Express.js

- Express.js is a low-level framework, while Nest.js is a high-level framework that provides a higher level of abstraction and structure.
- Express.js is a middleware-based framework, while Nest.js is a component-based framework.
- Express.js is a single-threaded framework, while Nest.js is a multi-threaded framework.
- Express.js is a low-level framework, while Nest.js is a high-level framework.

---

- React Query
- RTK Query
- Redux Saga

- Redux toolkit

  - Redux Saga
  - RTK Query

- Debounce
- Throttle
- useMemo
- useCallback

---

- SOLID Principles
- form elements
- polyfills
- CSS

- Brocode HTML
- JS Cafe
- CSS Cafe

- Iman Shaikh
- Frontend with Aman
- Zen of React
- Advance JS
- MongoDB

---

Some learning resources:

- https://javascriptpatterns.vercel.app/patterns
- https://www.frontendjoy.com/p/101-react-tips-tricks-for-beginners-to-experts
- https://reactpatterns.com/#proxy-component
- https://www.patterns.dev/react
- https://alexkondov.com/tao-of-react/ (must read)
- https://blog.algomaster.io/p/15-leetcode-patterns
- https://snrakshith.github.io/dsa-docs/
- https://github.com/Preparation-Street/Programming-Street-150/tree/main
- https://github.com/WebDevSimplified/permission-system

---

## Devops

function throttle(cb,delay=1000){
return()=>{
cb(...arg);
setTimeout(fin,delay);
}
}

---

Promise.all([])

- takes an array of promises, if 1 promise rejects every promise gets rejected.
