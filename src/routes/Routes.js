const signup = require("../api/SignUp");
const login = require("../api/Login");
const manager = require("../api/Manager");
const task = require("../api/Task");
module.exports = (app) => {
  app.post("/signup", signup.signup);
  app.get("/signup", signup.viewemp);
  app.put("/signup/:id", signup.editemp);
  app.delete("/signup/:id", signup.deleteemp);
  app.get("/login", login.login);
  app.post("/manager", manager.manager);
  app.get("/manager", manager.viewmanager);
  app.put("/manager/:id", manager.editmanager);
  app.delete("/manager/:id", manager.delete);
  app.post("/task", task.addtask);
  app.get("/task", task.viewtask);
  app.put("/task/:id", task.edittask);
  app.delete("/task/:id", task.deletetask);
  app.get("/filter", task.filtertask);
  app.get("/", (req, res) => {
    console.log("11111111111111111111111111");
    res.send("Yesss");
  });
};
