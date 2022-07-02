const signup = require("../api/SignUp");
const login = require("../api/Login");
const manager = require("../api/Manager");
const task = require("../api/Task");


module.exports = (app) => {

  app.post("/signup", signup.signup);
  app.get("/login", login.login);
  app.post("/manager", manager.manager);
  app.get("/manager", manager.viewmanager);
  app.put("/manager/:id", manager.editmanager);
  app.delete("/manager/:id", manager.delete);
  app.post("/task", task.task);
  app.get("/task", task.viewtask);
  app.put("/task/:id", task.edittask);
  app.delete("/task/:id", task.deletetask);
  app.get("/filter", task.filtertask);
 
};
