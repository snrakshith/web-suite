import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {});

app.listen(5000, () => console.log("App running on 5000"));
