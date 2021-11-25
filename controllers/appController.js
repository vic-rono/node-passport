exports.home = (req, res) => res.render("welcome");

exports.dashboard = (req, res) =>
  res.render("dashboard", {
    name: req.user.name,
  });
