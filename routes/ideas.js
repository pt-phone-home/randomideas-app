const express = require("express");
const router = express.Router();

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

// Get all ideas
router.get("/", (request, response) => {
  response.json({
    success: true,
    data: ideas,
  });
});

// Get individual idea by ID
router.get("/:id", (request, response) => {
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

// Add an idea
router.post("/", (request, response) => {
  const idea = {
    id: ideas.length + 1,
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  ideas.push(idea);

  response.json({
    success: true,
    data: idea,
  });
});

// Update an idea
router.put("/:id", (request, response) => {
  const idea = ideas.find((idea) => {
    return idea.id === +request.params.id;
  });

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  idea.text = request.body.text || idea.text;
  idea.tag = request.body.tag || idea.tag;
  idea.date = new Date().toISOString().slice(0, 10) || idea.date;

  response.json({
    success: true,
    data: idea,
  });
});

// Delete an idea
router.delete("/:id", (request, response) => {
  const idea = ideas.find((idea) => {
    return idea.id === +request.params.id;
  });

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  ideas.splice(ideas.indexOf(idea), 1);

  response.json({
    success: true,
    data: ideas,
  });
});
module.exports = router;
