const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// Get all ideas
router.get("/", async (request, response) => {
  try {
    const ideas = await Idea.find();
    response.json({ success: true, data: ideas });
  } catch (err) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});

// Get individual idea by ID
router.get("/:id", async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);
    response.json({
      success: true,
      data: idea,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
});

// Add an idea
router.post("/", async (request, response) => {
  const idea = new Idea({
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
  });

  try {
    const savedIdea = await idea.save();
    response.json({
      success: true,
      data: savedIdea,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
});

// Update an idea
router.put("/:id", async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);
    if (idea.username === request.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        request.params.id,
        {
          $set: {
            text: request.body.text,
            tag: request.body.tag,
          },
        },
        {
          new: true,
        }
      );
      return response.json({
        success: true,
        data: updatedIdea,
      });
    }
    // username does not match

    response.status(403).json({
      success: false,
      message: "You are not authorised to make that change",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
});

// Delete an idea
router.delete("/:id", async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);
    // Match usersnames
    if (idea.username === request.body.username) {
      await Idea.findByIdAndDelete(request.params.id);
      return response.json({
        success: true,
        data: {},
      });
    }

    // usernames do not match
    response.status(403).json({
      success: false,
      message: "You are not authorised to delete this resource",
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
});
module.exports = router;
