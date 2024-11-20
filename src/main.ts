import express from "express";
import cors from "cors";
import { ListPosts } from "./posts/ListPosts";
import { PostDAOMemory } from "./posts/data/PostDAOMemory";
import { CreatePost } from "./posts/CreatePost";
import { GetPost } from "./posts/GetPost";
import { SearchPost } from "./posts/SearchPost";

const app = express();
app.use(express.json());
app.use(cors());

const dao = new PostDAOMemory();

app.get("/posts", async (req, res) => {
  const service = new ListPosts(dao);
  const output = await service.execute();
  res.status(200).json(output);
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const service = new GetPost(dao);
  try {
    const output = await service.execute(id);
    res.status(200).json(output);
  } catch (error) {
    res.status(404).send();
  }
});

app.post("/posts", async (req, res) => {
  const service = new CreatePost(dao);
  await service.execute(req.body);
  res.status(201).send();
});

app.get("/posts/search/:keyword", async (req, res) => {
  const service = new SearchPost(dao);
  const output = await service.execute(req.params.keyword);
  res.status(200).json(output);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
