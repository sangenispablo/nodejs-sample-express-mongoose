const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62e7db9f92f8631564c5e4b3")
    .then((user) => {
      // req.user = new User(user.name, user.email, user.cart, user._id);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://pablo_admin:xy34TxCdRUWe3vP@miclusterpas.rqsvs.mongodb.net/shop"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        // const user = new User({
        //   name: "Pablo",
        //   email: "pablo@gmail.com",
        //   cart: {
        //     items: [],
        //   },
        // });
        // user.save();
      }
    });
    console.log(
      "Connected to MongoDB",
      result.connections[0].host,
      result.connections[0].port
    );
    app.listen(3000, () => {
      console.log("Server Up: 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
