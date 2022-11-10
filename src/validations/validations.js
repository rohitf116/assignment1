exports.isValid = (str) => {
  if (str === undefined || str === null) return false;
  if (typeof str === "string" && str.trim().length === 0) return false;
  return true;
};

exports.isNameValid = (str) => {
  if (!/^[a-z ,.'-]+$/i.test(str)) return false;
  return true;
};

exports.isEmailValid = (email) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  return true;
};
