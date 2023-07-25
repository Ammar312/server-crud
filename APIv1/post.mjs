import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();
const dateVar = JSON.stringify(new Date());
const result = dateVar.slice(0, 11);

let posts = [
  {
    id: "12345",
    title: "abc post title",
    text: "some post text",
  },
];

router.get("/post/:postId", (req, res, next) => {
  res.send("This is post " + new Date());
});

router.get("/posts", (req, res, next) => {
  res.send(`${JSON.stringify(posts)}  `);
});

router.post("/post", (req, res, next) => {
  if (!req.body.title || !req.body.text) {
    res.status(403).send(`Required parameter missing`);
    return;
  }
  posts.unshift({ id: nanoid(), title: req.body.title, text: req.body.text });
  res.send(`Post Created at ${result}`);
});

router.put("/post/:postId", (req, res, next) => {
  const id = req.params.postId;
  if (!req.body.title || !req.body.text) {
    res.status(403).send(`Required parameter missing`);
    return;
  }
  let isFound = false;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts[i].title = req.body.title;
      posts[i].text = req.body.text;
      isFound = true;
      break;
    }
  }
  if (isFound) {
    res.send("Post Updated Successfully");
  } else {
    res.status(404).send("Not Found");
  }
  console.log(id);
});

router.delete("/post/:postId", (req, res, next) => {
  const id = req.params.postId;
  let isFound = false;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts.splice(i, 1);
      res.send("post deleted successfully");
      isFound = true;
      break;
    }
  }
  if (isFound === false) {
    res.status(404);
    res.send({
      message: "delete fail: post not found",
    });
  }
});

export default router;
