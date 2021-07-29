const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const { s3Upload } = require("../helpers/fileHandler");

const createUser = async (request, response, next) => {
  const { username, firstName, lastName, password, email } = request.body;

  if (!username || !password || !email || !firstName || !lastName) {
    response.status(400).json("Missing required params");
  }

  await User.findOne(
    { $or: [{ username }, { email }] },
    async (error, user) => {
      if (user) {
        return response
          .status(400)
          .json("user already exists with this username or email");
      } else {
        let newUser = await new User({
          username,
          firstName,
          lastName,
          email,
          password,
        });

        await bcrypt.genSalt(10, async (error, salt) => {
          await bcrypt.hash(password, salt, async (error, hash) => {
            newUser.password = hash;
            newUser.save();

            request.body.username = newUser.username;
            request.body.password = password;
            next();
          });
        });
      }
    }
  );
};

const editUser = async (request, response) => {
  const keys = Object.keys(request.body);

  const currentUser = request.user._id;

  let user = await User.findOne({ _id: currentUser });

  if (!user) {
    return response.status(400).json({ Error: "no user found" });
  }

  for (let i = 0; i < keys.length; i++) {
    user[keys[i]] = request.body[keys[i]];
  }

  user.save();
  return response.status(200).json({ user });
};

const uploadUserProfileImage = async (request, response) => {
  const { body, newFileNameForUpload, contentType, contentEncoding } =
    response.locals.file;

  const currentUser = request.user._id;

  let user = await User.findOne({ _id: currentUser });

  if (!user) {
    return response.status(400).json({ Error: "no user found" });
  }

  try {
    let s3Url = await s3Upload(
      body,
      newFileNameForUpload,
      contentType,
      contentEncoding
    );

    return response
      .status(200)
      .json({ message: "image uploaded successfully", data: s3Url });
  } catch (error) {
    return response.status(400).json({ Error: "image could not be uploaded" });
  }
};

module.exports = { createUser, uploadUserProfileImage, editUser };
