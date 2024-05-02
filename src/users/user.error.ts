export const userErrorMessages = {
  emailAlreadyInUse: {
    status: 409,
    message: "The email you are using is already in use.",
  },
  emailNotFound: {
    status: 404,
    message: "The email you are using does not exist.",
  },
  wrongPassword: {
    status: 401,
    message: "Incorrect password.",
  },
  notAuthenticated: {
    status: 401,
    message: "Not authenticated.",
  },
  notAuthorized: {
    status: 403,
    message: "Not authorized.",
  },
  incorrectOtp: {
    status: 401,
    message: "The OTP you entered is incorrect.",
  },
  userNotFound: {
    status: 404,
    message: "User not found.",
  },
};
