export default {
  common: {
    login: "Log in",
    createAccount: "Create an account",
  },
  Navbar: {
    label: "Navbar",
    logout: "Log out",
    category: "Category",
    myLearning: "My learning",
    instructor: "Instructor",
    academy: "Academy",
    searching: "Search for anything",
    searchCourse: "Search Course",
    searchClass: "Search Class",
    wishlist: "Wishlist",
    notification: "Notification",
  },
  UserMenu: {
    label: "User Menu",
    user: "User",
    lists: "Lists",
    useful: "Useful",
  },
  LoginPage: {
    label: "Log in to your EngMan account",
    notHaveAccount: "You don't have an account",
    registerNow: "Register now",
  },
  RegisterPage: {
    label: "Register Account",
    haveAccount: "You had an account",
    loginNow: "Login now",
  },
  validation: {
    required: "$t({{name}}.label) is required",
    min: "$t({{name}}.label) min length is {{data.0}}",
    max: "$t({{name}}.label) max length is {{data.0}}",
    minMax:
      "$t({{name}}.label) must have length from {{data.0}} to {{data.1}}",
    missMatch: "$t({{name}}.label) must match with $t({{data.0}}.label)",
    invalid: "$t({{name}}.label) is invalid",
    username: {
      label: "Username",
      missPattern:
        "$t({{name}}.label) must have length from {{data.0}} to {{data.1}} and only include characters in a-z, A-Z, 0-9",
    },
    password: { label: "Password" },
    retypePassword: {
      label: "Retype Password",
    },
    firstName: { label: "First Name" },
    lastName: { label: "Last Name" },
    login: {
      title: "Login Failed",
      message: "Username or Password is wrong",
    },
    register: {
      title: "Register Failed",
      exists: "User is already exists",
    },
    system: {
      title: "System Error",
      message: "An error has occurred in the system",
    },
  },
  glossary: {},
};
