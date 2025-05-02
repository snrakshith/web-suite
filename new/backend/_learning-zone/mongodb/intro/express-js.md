# Some tips

- `data folder` to store sample test data
- Middleware
  - custom error handler
  - Async-Await
  - Slugify
- seeder
- controller/folder takes in the logic which goes in to the routes file
- Dont forget to use `body-parser` middleware when using POST & PUT requests to parse the body of the request

  - data resides in `req.body`

- use a `try-catch` block to handle errors/promise rejections

```js
const newBootcamp = await Bootcamp.create(req.body); // create a new Bootcamp
res.status(201).json({ success: true, data: newBootcamp });
```

# Get

```js
// find & display
const bootcamps = await Bootcamp.find();
const bootcamps = await Bootcamp.findById(req.params.id);
res.status(201).json({ success: true, data: bootcamps });

// if not found
res.status(404).json({ success: false, message: "Bootcamp not found" });
// found but wrong id
res.status(400).json({ success: false, message: "Invalid Bootcamp ID" });
```

# Update

```js
const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true,
});
res.status(200).json({ success: true, data: bootcamp });
```

# Delete

```js
const mongoose = require("mongoose");
const Bootcamp = require("../models/Bootcamp"); // Adjust the path as needed

// Delete Bootcamp by ID
const deleteBootcamp = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(id);

    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, message: "Bootcamp not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = deleteBootcamp;
```
