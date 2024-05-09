export const userErrorMessages = {
  emailAlreadyInUse: {
    status: 409,
    messages: "The email you are using is already in use.",
  },
  emailNotFound: {
    status: 404,
    messages: "The email you are using does not exist.",
  },
  wrongPassword: {
    status: 401,
    messages: "Incorrect password.",
  },
  notAuthenticated: {
    status: 401,
    messages: "Not authenticated.",
  },
  notAuthorized: {
    status: 403,
    messages: "Not authorized.",
  },
  incorrectOtp: {
    status: 401,
    messages: "The OTP you entered is incorrect.",
  },
  userNotFound: {
    status: 404,
    messages: "User not found.",
  },
};
