import express from "express";
import cors from "cors";
import { ListPosts } from "./posts/ListPosts";
import { PostDAOMemory } from "./posts/data/PostDAOMemory";
import { CreatePost } from "./posts/CreatePost";
import { GetPost } from "./posts/GetPost";
import { SearchPost } from "./posts/SearchPost";
import { DeletePost } from "./posts/DeletePost";
import { ClearPosts } from "./posts/ClearPosts";
import { PostDAOMongo } from "./posts/data/PostDAOMongo";
import { MongoConfig } from "./infra/database/mongo";

const app = express();
app.use(express.json());
app.use(cors());

const dao = new PostDAOMongo(
  new MongoConfig(
    process.env.MONGO_URL as string,
    process.env.MONGO_DB as string
  )
);

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
  const post_id = await service.execute(req.body);
  res.status(201).json({ post_id });
});

app.get("/posts/search/:keyword", async (req, res) => {
  const service = new SearchPost(dao);
  const output = await service.execute(req.params.keyword);
  res.status(200).json(output);
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const service = new DeletePost(dao);
  try {
    await service.execute(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.delete("/posts", async (req, res) => {
  const service = new ClearPosts(dao);
  await service.execute();
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
