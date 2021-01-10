const logout = (request, response) => {
  if (request.isAuthenticated()) {
    request.logout();
    return response.status(200).json({ message: "logout successful" });
  } else {
    return response
      .status(400)
      .json({ message: "no authenticated user found" });
  }
};

const checkForAuthentication = (request, response, next) => {
  if (!request.isAuthenticated()) {
    return response
      .status(401)
      .json({ message: "must be logged in to access" });
  } else {
    next();
  }
};

module.exports = { logout, checkForAuthentication };
