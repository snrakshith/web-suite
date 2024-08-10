import express from "express";

const app = express();
app.use(express.json());

const homePageAPI = async (req, res) => {
  try {
    const { id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(req.body.vendorId)) {
    //   return res.json({ message: "Vendor Id is not an objectId" });
    // }
    const cashedPosts = await client.get(`posts-${id}`);
    if (cashedPosts) {
      // const posts = JSON.parse(cashedPosts);
      // return res.json({ posts });

      return res.json(JSON.parse(cashedPosts));
    }

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const postData = JSON.stringify(response.data);
    // const setNewData = await client.set(`post-${id}`, postData);
    // const setExpiry = await client.expire(`post-${id}`, 60);
    // await client.set(`post-${id}`, postData, "EX", 10);
    await client.set(`post-${id}`, postData);
    return res.json({ data: response.data });
  } catch (error) {
    return res.json({ msg: error });
  }
};

app.get("/", async (req, res) => {
  const { key } = req.body;
  const value = await client.get(key);
  res.json({ value });
});

app.post("/", async (req, res) => {
  const { key, value } = req.body;
  const data = await client.set(key, value);
  res.json({ data });
});

app.get("/post/:id", homePageAPI);

app.listen(5000, () => console.log("App running on 5000"));
