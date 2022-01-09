const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { request, response } = require("express");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

let uri = "<youruri>";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const ExerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});

const UserSchema = new mongoose.Schema({
  username: String,
});

const User = mongoose.model("User", UserSchema);
const Exercise = mongoose.model("Exercise", ExerciseSchema);

app.post("/api/users", (req, res) => {
  const newUser = new User({
    username: req.body.username,
  });

  newUser.save((err, data) => {
    if (err || !data) {
      res.send("There was an error saving the user");
    } else {
      res.json(data);
    }
  });
});

app.post("/api/users/:id/exercises", (req, res) => {
  const id = req.params.id;
  const { description, duration, date } = req.body;
  const dateObj = date === "" ? new Date() : new Date(date);
  let responseObj = {};
  User.findById(id, (err, userData) => {
    if (err || !userData) {
      res.send("Could not find user");
    } else {
      const newExercise = new Exercise({
        userId: id,
        description,
        duration: parseInt(duration),
        date: new Date(dateObj),
      });
      if (!newExercise.date) {
        newExercise.date = new Date().toDateString();
      } else if (newExercise.date) {
        newExercise.date = new Date(newExercise.date).toDateString();
      }
      newExercise.save((err, data) => {
        if (err || !data) {
          res.send("There was an error saving this exercise");
        } else {
          let { description, duration, date, _id } = data;
          let responseObj = {
            username: userData.username,
            description,
            date: newExercise.date.toDateString(),
            _id: userData.id,
            duration,
          };
          res.json(responseObj);
        }
      });
    }
  });
});

app.get("/api/users/:id/logs", (req, res) => {
  if (req.query.limit == undefined || "") {
    req.query["limit"] = 500;
  }
  const { from, to, limit } = req.query;
  const { id } = req.params;
  User.findById(id, (err, userData) => {
    if (err || !userData) {
      res.send("Could not find User");
    } else {
      let dateObj = {};
      if (from) {
        dateObj["$gte"] = new Date(from);
      }
      if (to) {
        dateObj["$lte"] = new Date(to);
      }
      let filter = {
        userId: id,
      };
      if (from || to) {
        filter.date = dateObj;
      }
      let nonNullLimit = limit;
      Exercise.find(filter)
        .limit(+nonNullLimit)
        .exec((err, data) => {
          if (err || !data) {
            res.json({});
          } else {
            const count = data.length;
            const rawLog = data;
            const { username, _id } = userData;
            const log = rawLog.map((l) => ({
              description: l.description,
              duration: l.duration,
              date: new Date(l.date).toDateString(),
            }));
            res.json({ username, count, _id, log });
          }
        });
    }
  });
});

app.get("/api/users", (req, res) => {
  User.find({}, (err, data) => {
    if (err || !data) {
      res.send("No users");
    } else {
      res.json(data);
    }
  });
});
