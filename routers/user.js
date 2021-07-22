const express = require("express");
const userRouter = express.Router();
const Busboy = require("busboy");
const { createUser } = require("../controllers/user");
const passport = require("../helpers/passport");
const { logout } = require("../helpers/auth");
const ObjectID = require("mongodb").ObjectID;
const { uploadUserProfileImage } = require("../controllers/user");
const { checkForAuthentication } = require("../helpers/auth");

imageParser = (request, response, next) => {
  let busboy = new Busboy({ headers: request.headers });
  let body = [];
  let newFileNameForUpload = [];
  let contentType;
  let contentEncoding;
  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    // push each data chunk to the body array
    file.on("data", function (data) {
      body.push(data);
    });
    file.on("end", function () {
      // generate a new file name
      let splitFileName = filename.split(".");
      let extension = splitFileName[splitFileName.length - 1];
      newFileNameForUpload.push(ObjectID(), extension);
      newFileNameForUpload = newFileNameForUpload.join(".");
      // set the mimetype on contentType so the data exists in the proper scope
      contentType = mimetype;
      contentEncoding = encoding;
      // join data chunks before upload
      body = Buffer.concat(body);
    });
  });
  busboy.on("finish", async function () {
    console.log(body, newFileNameForUpload, contentType, contentEncoding);
    response.locals.file = {
      body,
      newFileNameForUpload,
      contentType,
      contentEncoding,
    };
    next();
  });
  request.pipe(busboy);
};

userRouter.post(
  "/upload-profile-image",
  checkForAuthentication,
  imageParser,
  uploadUserProfileImage
);

userRouter.post(
  "/",
  createUser,
  passport.authenticate("local"),
  (request, response) => {
    return response.status(201).json(request.user);
  }
);

userRouter.post(
  "/login",
  passport.authenticate("local"),
  (request, response) => {
    return response.status(200).json(request.user);
  }
);

userRouter.get("/logout", logout);

userRouter.get(
  "/",
  async (request, response, next) => {
    const isAuth = request.isAuthenticated();
    if (isAuth) {
      next();
    } else {
      return response.status(401).json({ error: "not authed for endpoint" });
    }
  },
  (request, response) => {
    return response.send(request.user);
  }
);

module.exports = userRouter;
