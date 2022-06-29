module.exports = (app) => {
  const users = require("../api/api");

  app.post("/signup", users.signup);
  app.get("/login", users.login);
  app.post("/manager",users.manager);
  app.get("/manager",users.viewmanager);
  app.put("/manager/:id",users.editmanager);
  app.delete("/manager/:id",users.delete);
  app.post("/task",users.task);
  app.get("/task",users.viewtask);
  app.put("/task/:id",users.edittask);
  app.delete("/task/:id",users.deletetask);
};
