const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

// CREATE PROJECT

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {

    try {

      const { title, description } = req.body;

      const newProject = new Project({

        title,

        description,

        image: req.file
          ? req.file.path
          : "",

        user: req.user.id,

      });

      await newProject.save();

      res.status(201).json({
        message: "Project Created",
        project: newProject,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);



// GET USER PROJECTS

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const projects = await Project.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });

      res.json(projects);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);



// UPDATE PROJECT

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const { title, description } = req.body;

      const updatedProject =
        await Project.findByIdAndUpdate(
          req.params.id,
          {
            title,
            description,
          },
          {
            new: true,
          }
        );

      res.json({
        message: "Project Updated",
        project: updatedProject,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);



// DELETE PROJECT

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Project Deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);



module.exports = router;