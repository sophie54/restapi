const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "apicheckpoint",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To Database .");
  })
  .catch(() => {
    console.error("Can't Connect To Your Database.");
  });

app.listen(5000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server is up and running on port 5000");
  }
});

app.get("/getUser", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => console.log(err.message));
});

app.post("/postUser", (req, res) => {
  const { firstname, lastname, age } = req.body;
  let newUser = new User({
    firstname,
    lastname,
    age,
  });
  newUser
    .save()
    .then(res.send(req.body))
    .catch((err) => console.error(err.message));
});

app.put("/putUser/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(res.send("User Updated Successfully"))
    .catch((err) => console.error(err.message));
});

app.delete("/deleteUser/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(res.send("User Deleted Successfully"))
    .catch((err) => console.error(err.message));
});
