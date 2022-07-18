const signup = require("../api/SignUp");
const login = require("../api/Login");
const manager = require("../api/Manager");
const task = require("../api/Task");
const profilePic = require("../api/ProfilePic");
// const validUrl = require('valid-url');
const forgotPassword = require("../api/ForgotPassword");
const {
  validate,
  signupvalidate
} = require("../utils/validation");
const validation = require("../utils/validationSchema");
module.exports = (app) => {
  app.post("/signup", validate(validation.usersignup), signup.signup);
  app.get("/signup", signup.viewemp);
  app.put("/signup/:id", signup.editemp);
  app.delete("/signup/:id", signup.deleteemp);
  app.post("/login", validate(validation.signin), login.login);
  app.post("/manager", manager.manager);
  app.get("/manager", manager.viewmanager);
  app.put("/manager/:id", manager.editmanager);
  app.delete("/manager/:id", manager.delete);
  app.post("/task", task.addtask);
  app.get("/task", task.viewtask);
  app.put("/task/:id", task.edittask);
  app.delete("/task/:id", task.deletetask);
  app.get("/filter", task.filtertask);
  app.post("/sendotp", forgotPassword.sendOtp);
  app.post("/reset", forgotPassword.reset);
  app.post("/profile", profilePic.addPic);
  app.get("/profile", profilePic.viewPic);
  app.put("/profile", profilePic.deletePic);
};