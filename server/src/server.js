import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/articles", async (req, res) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  const db = client.db("blogDB");

  const articles = await db.collection("articles").find({}).toArray();

  if (articles) {
    res.json(articles);
  } else {
    res.sendStatus(404);
  }
});

app.get("/api/articles/:id", async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  const db = client.db("blogDB");

  const articles = await db
    .collection("articles")
    .findOne({ _id: new ObjectId(id) });
  console.log(articles);

  if (articles) {
    res.json(articles);
  } else {
    res.sendStatus(404);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  const db = client.db("blogDB");

  await db.collection("articles").updateOne(
    { name },
    {
      $inc: { upvotes: 1 },
    }
  );

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
    res.sendStatus(200).end();
  } else {
    res.sendStatus(404).end();
  }
});

app.post("/api/articles/:id/comment", (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  const article = mockArticles.find((article) => article.id == id);
  if (article) {
    article.comments.push(comment);
    res.json(article);
    res.send(200).end();
  } else {
    res.send(404).end();
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server is listening to port " + port));
