exports.getLogin = (req, res, next) => {
  console.log(req.get("Cookie", "loggedIn").split("=")[1]);
  const isLoggedIn = req.get("Cookie", "loggedIn").split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // esto no funciona por que despues que haga el redirect
  // se pierde todo y ya no queda guardado el dato de isLoggedIn
  // req.isLoggedIn = true;
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
