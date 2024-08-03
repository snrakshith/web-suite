import express from "express";
import { createPostPdf } from "./pdf";

const app = express();
app.use(express.json());

app.get("/", createPostPdf);

app.listen(5000, () => console.log("App running on 5000"));
