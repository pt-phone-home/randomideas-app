const express = require("express");
const port = 5000;

const app = express();

const ideas = [
  {
    id: 1,
    text: "Positivity Newsletter, a newsletter that shares only positive ideas",
    tag: "Technology",
    username: "TonyStark",
    date: "2024-01-02",
  },
  {
    id: 2,
    text: "Milk carton that changes colour the older the milk gets",
    tag: "Invenstions",
    username: "SteveRogers",
    date: "2024-01-02",
  },
  {
    id: 3,
    text: "Paper that automatically recycles",
    tag: "Sustainability",
    username: "PeterTiernan",
    date: "2024-01-02",
  },
  {
    id: 4,
    text: "Self charging phone",
    tag: "Technology",
    username: "TonyStark",
    date: "2024-01-02",
  },
  {
    id: 5,
    text: "Self-grading assignments",
    tag: "Education",
    username: "PeterTiernan",
    date: "2024-01-02",
  },
];

app.get("/", (request, response) => {
  response.json({
    message: "Welcome to the Random Ideas App",
  });
});
app.get("/api/ideas", (request, response) => {
  response.json({
    success: true,
    data: ideas,
  });
});
app.get("/api/ideas/:id", (request, response) => {
  const idea = ideas.find((idea) => {
    return idea.id === +request.params.id;
  });

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  response.json({
    success: true,
    data: idea,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
